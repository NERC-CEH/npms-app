/** ****************************************************************************
 * Record Taxa List main view.
 *****************************************************************************/

import './styles.scss';

import $ from 'jquery';
import Marionette from 'marionette';
import Morel from 'morel';
import Hammer from 'hammer';
import Log from 'log';
import Device from 'device';
import DateHelp from 'date';
import Gallery from '../../../common/gallery';
import StringHelp from 'string';
import JST from 'JST';

const SpeciesView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'table-view-cell swipe',
  template: JST['records/taxa/list/taxon'],

  triggers: {
    'click #delete': 'species:delete',
  },

  events: {
    // need to pass the attribute therefore 'triggers' method does not suit
    'click .js-attr': function (e) {
      e.preventDefault();
      this.trigger('species:edit:attr', $(e.target).data('attr'));
    },
    'click img': 'photoView',
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
    Log('Records:Taxa:List:MainView: rendering a species');

    // add mobile swipe events
    // early return
    if (!Device.isMobile()) return;

    this.$species = this.$el.find('a');
    this.docked = false;
    this.position = 0;

    const options = {
      threshold: 50,
      toolsWidth: 100,
    };

    const hammertime = new Hammer(this.el, { direction: Hammer.DIRECTION_HORIZONTAL });
    const that = this;

    // on tap bring back
    this.$species.on('tap click', $.proxy(this._swipeHome, this));

    hammertime.on('pan', (e) => {
      e.preventDefault();
      that._swipe(e, options);
    });
    hammertime.on('panend', (e) => {
      that._swipeEnd(e, options);
    });
  },

  remove() {
    Log('Records:Taxa:List:MainView: removing a species');
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
    const occurrence = this.model;
    const sample = occurrence.sample;
    const taxon = occurrence.get('taxon');
    const abundance = occurrence.get('abundance');

    return {
      id: sample.id || sample.cid,
      occId: occurrence.id || occurrence.cid,
      common_name: taxon.common_name,
      scientific_name: taxon.scientific_name,
      abundance,
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

    this.$species.css('transform', `translateX(${this.position}px)`);
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

    this.$species.css('transform', `translateX(${this.position}px)`);
  },

  _swipeHome(e) {
    if (this.docked) {
      e.preventDefault();
      this.position = 0;
      this.$species.css('transform', `translateX(${this.position}px)`);
      this.docked = false;
    }
  },
});

const NoSpeciesView = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'table-view-cell empty swipe',
  template: JST['records/taxa/list/list-none'],

  serializeData() {
    return {
      id: this.options.recordModelID,
    };
  },
});

export default Marionette.CollectionView.extend({
  id: 'taxa-list',
  tagName: 'ul',
  className: 'table-view no-top',
  emptyView: NoSpeciesView,
  childView: SpeciesView,


  // inverse the collection
  attachHtml(collectionView, childView) {
    collectionView.$el.prepend(childView.el);
  },

  childViewOptions() {
    return {
      appModel: this.options.appModel,
      recordModelID: this.options.recordModelID,
    };
  },
});
