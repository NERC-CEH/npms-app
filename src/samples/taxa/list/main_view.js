/** ****************************************************************************
 * Sample Taxa List main view.
 **************************************************************************** */
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Hammer from 'hammerjs';
import Device from 'helpers/device';
import Log from 'helpers/log';
import JST from 'JST';
import Gallery from '../../../common/gallery';
import './styles.scss';

const SpeciesView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell swipe',
  template: JST['samples/taxa/list/taxon'],

  initialize() {
    const images = this.model.media;
    this.listenTo(images, 'add remove set', this.render);
  },

  triggers: {
    'click #delete': 'species:delete',
  },

  events: {
    // need to pass the attribute therefore 'triggers' method does not suit
    // eslint-disable-next-line
    'click .js-attr': function (e) {
      e.preventDefault();
      this.trigger('species:edit:attr', $(e.target).data('attr'));
    },
    'click span.delete': 'delete',
    'click img': 'photoView',

    // eslint-disable-next-line
    'change input': function (e) {
      e.preventDefault();
      this.trigger('photo:upload', e, this.model);
    },
  },

  delete(e) {
    e.preventDefault();
    const img = this.model.media.at(0);
    this.trigger('photo:delete', img);
  },

  photoView(e) {
    e.preventDefault();

    const items = [];

    const img = this.model.media.at(0);
    items.push({
      src: img.getURL(),
      w: img.get('width') || 800,
      h: img.get('height') || 800,
    });

    // Initializes and opens PhotoSwipe
    const gallery = new Gallery(items);
    gallery.init();
  },

  onRender() {
    Log('Samples:Taxa:List:MainView: rendering a species');

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

    const hammertime = new Hammer(this.el, {
      direction: Hammer.DIRECTION_HORIZONTAL,
    });
    const that = this;

    // on tap bring back
    this.$species.on('tap click', $.proxy(this._swipeHome, this));

    hammertime.on('pan', e => {
      e.preventDefault();
      that._swipe(e, options);
    });
    hammertime.on('panend', e => {
      that._swipeEnd(e, options);
    });
  },

  remove() {
    Log('Samples:Taxa:List:MainView: removing a species');
    // removing the last element leaves emptyView + fading out entry for a moment
    if (this.model.collection && this.model.collection.length >= 1) {
      const that = this;
      this.$el.addClass('shrink');
      setTimeout(() => {
        Marionette.View.prototype.remove.call(that);
      }, 300);
    } else {
      Marionette.View.prototype.remove.call(this);
    }
  },

  serializeData() {
    const occ = this.model;
    const sample = occ.parent;

    const taxon = occ.get('taxon');
    const abundance = occ.get('abundance');

    let img;
    if (occ.media.length) {
      img = occ.media.at(0).get('thumbnail');
    }

    const hasNoPic = !img;
    const isDifficult = taxon.difficulty !== 1;
    const isGenus = taxon.scientific_name.split(' ').length === 1;
    const showSciNameWarning = hasNoPic && (isDifficult || isGenus);

    return {
      id: sample.id || sample.cid,
      occId: occ.id || occ.cid,
      common_name: taxon.common_name,
      scientific_name: taxon.scientific_name,
      abundance,
      img,
      showSciNameWarning,
    };
  },

  onAttach() {
    const that = this;

    // create camera/gallery selection
    if (window.cordova) {
      this.$el.find('.img-picker input').remove();

      this.$el.find('.img-picker').on('click', e => {
        e.preventDefault();
        that.trigger('photo:selection', that.model);
      });
    }
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

    if (-options.toolsWidth + e.deltaX > -options.toolsWidth) {
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

const NoSpeciesView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell empty swipe',
  template: JST['samples/taxa/list/list-none'],

  serializeData() {
    return {
      id: this.options.sampleID,
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
      sampleID: this.options.sampleID,
    };
  },
});
