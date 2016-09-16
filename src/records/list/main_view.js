/** ****************************************************************************
 * Record List main view.
 *****************************************************************************/

import $ from 'jquery';
import Marionette from 'marionette';
import Morel from 'morel';
import Hammer from 'hammer';
import { Log, Device, DateHelp } from 'helpers';
import JST from 'JST';
import Gallery from '../../common/gallery';
import './styles.scss';

const RecordView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'table-view-cell swipe',

  triggers: {
    'click #delete': 'record:delete',
  },

  events: {
    // need to pass the attribute therefore 'triggers' method does not suit
    'click .js-attr': function (e) {
      e.preventDefault();
      this.trigger('record:edit:attr', $(e.target).data('attr'));
    },
    'click img': 'photoView',
  },

  modelEvents: {
    'request sync error': 'render',
    geolocation: 'render',
  },

  initialize() {
    this.template = JST['records/list/record'];
  },

  photoView(e) {
    e.preventDefault();

    const items = [];

    this.model.images.each((image, index) => {
      items.push({
        src: image.getURL(),
        w: image.get('width') || 800,
        h: image.get('height') || 800,
      });
    });

// Initializes and opens PhotoSwipe
    const gallery = new Gallery(items);
    gallery.init();
  },

  onRender() {
    Log('Records:List:MainView: rendering a record');

    // add mobile swipe events
    // early return
    if (!Device.isMobile()) return;

    this.$record = this.$el.find('a');
    this.docked = false;
    this.position = 0;

    const options = {
      threshold: 50,
      toolsWidth: 100,
    };

    const hammertime = new Hammer(this.el, { direction: Hammer.DIRECTION_HORIZONTAL });
    const that = this;

    // on tap bring back
    this.$record.on('tap click', $.proxy(this._swipeHome, this));

    hammertime.on('pan', (e) => {
      e.preventDefault();
      that._swipe(e, options);
    });
    hammertime.on('panend', (e) => {
      that._swipeEnd(e, options);
    });
  },

  remove() {
    Log('Records:MainView: removing a record');
    // removing the last element leaves emptyView + fading out entry for a moment
    if (this.model.collection && this.model.collection.length >= 1) {
      const that = this;
      this.$el.addClass('shrink');
      setTimeout(() => {
        Marionette.ItemView.prototype.remove.call(that);
      }, 300);
    } else {
      Marionette.ItemView.prototype.remove.call(this);
    }
  },

  serializeData() {
    const recordModel = this.model;
    const date = DateHelp.print(recordModel.get('date'));
    const location = recordModel.get('location') || {};
    const square = location.square;
    const plot = location.plot;
    const level = recordModel.get('level');
    // let img = recordModel.images.length && recordModel.images.at(0).get('thumbnail');

    const syncStatus = this.model.getSyncStatus();

    return {
      id: recordModel.id || recordModel.cid,
      square,
      plot,
      level,
      date,
      saved: recordModel.metadata.saved,
      onDatabase: syncStatus === Morel.SYNCED,
      isSynchronising: syncStatus === Morel.SYNCHRONISING,
      // img: img ? `<img src="${img}"/>` : '',

    };
  },

  _swipe(e, options) {
    // only swipe if no scroll up
    if (Math.abs(e.deltaY) > 10) return;

    if (this.docked) {
      this.position = -options.toolsWidth + e.deltaX;
    } else {
      this.position = e.deltaX;
    }

    // protection of swipeing right too much
    if (this.position > 0) this.position = 0;

    this.$record.css('transform', `translateX(${this.position}px)`);
  },

  _swipeEnd(e, options) {
    // only swipe if no scroll up and is not in the middle
    if (Math.abs(e.deltaY) > 10 && !this.position) return;

    if ((-options.toolsWidth + e.deltaX) > -options.toolsWidth) {
      // bring back
      this.position = 0;
      this.docked = false;
    } else {
      // open tools
      this.docked = true;
      this.position = -options.toolsWidth;
    }

    this.$record.css('transform', `translateX(${this.position}px)`);
  },

  _swipeHome(e) {
    if (this.docked) {
      e.preventDefault();
      this.position = 0;
      this.$record.css('transform', `translateX(${this.position}px)`);
      this.docked = false;
    }
  },
});

const NoRecordsView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'table-view-cell empty swipe',
  template: JST['records/list/list-none'],
});

export default Marionette.CollectionView.extend({
  id: 'records-list',
  tagName: 'ul',
  className: 'table-view no-top',
  emptyView: NoRecordsView,
  childView: RecordView,

  triggers: {
    'click a#add-survey': 'survey',
  },

  // inverse the collection
  attachHtml(collectionView, childView) {
    collectionView.$el.prepend(childView.el);
  },

  childViewOptions() {
    return {
      appModel: this.options.appModel,
    };
  },
});
