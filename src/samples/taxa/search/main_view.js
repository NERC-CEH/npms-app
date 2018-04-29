/** ****************************************************************************
 * Taxon main view.
 **************************************************************************** */
import _ from 'lodash';
import Backbone from 'backbone';
import Marionette from 'backbone.marionette';
import JST from 'JST';
import Log from 'helpers/log';
import Device from 'helpers/device';
import './styles.scss';

const MIN_SEARCH_LENGTH = 2;

const SpeciesView = Marionette.View.extend({
  tagName: 'li',
  className() {
    return `table-view-cell ${this.model.get('selected') ? 'selected' : ''}`;
  },

  template: JST['samples/taxa/search/species'],

  events: {
    click: 'select',
  },

  modelEvents: { change: 'render' },

  /**
   * Prepare search results for the view
   * @returns {{}}
   */
  serializeData() {
    const foundInName = this.model.get('found_in_name');

    let name = this._prettifyName(this.model.get(foundInName), this.options.searchPhrase);
    name = this.model.get(foundInName);

    return {
      name,
      removeEditBtn: this.options.removeEditBtn,
    };
  },

  _prettifyName(name, searchPhrase) {
    const searchPos = name.toLowerCase().indexOf(searchPhrase);
    const prettyName = `${name.slice(0, searchPos)}
    <b>${name.slice(searchPos, searchPos + searchPhrase.length)}</b>
    ${name.slice(searchPos + searchPhrase.length)}`;

    return prettyName;
  },

  onRender() {
    // have to manually repaint
    this.$el.removeClass().addClass(this.className());
  },

  select(e) {
    Log('taxon: selected.', 'd');
    const edit = e.target.tagName === 'BUTTON';
    const species = this.model.toJSON();
    delete species.selected;

    this.trigger('taxon:selected', species, edit);
  },
});

const NoSuggestionsView = Marionette.View.extend({
  tagName: 'li',
  className: 'table-view-cell empty',
  template: _.template('No species found with this name'),
});

const SuggestionsView = Marionette.CollectionView.extend({
  tagName: 'ul',
  className: 'table-view',
  emptyView: NoSuggestionsView,
  childView: SpeciesView,
  childViewOptions() {
    return {
      removeEditBtn: this.options.removeEditBtn,
      searchPhrase: this.options.searchPhrase,
    };
  },
});

export default Marionette.View.extend({
  template: JST['samples/taxa/search/layout'],

  events: {
    'keydown #taxon': '_keydown',
    'keyup #taxon': '_keyup',
    'click .delete': 'deleteSearch',
  },

  regions: {
    suggestions: '#suggestions',
  },

  initialize() {
    this.selectedIndex = 0;
  },

  onAttach() {
    // preselect the input for typing
    const $input = this.$el.find('#taxon').focus();
    if (window.cordova && Device.isAndroid()) {
      window.Keyboard.show();
      $input.focusout(() => {
        window.Keyboard.hide();
      });
    }

    const userModel = this.model;
    const statistics = userModel.get('statistics') || { species: [] };
    const favouriteSpecies = statistics.species;
    if (favouriteSpecies.length) {
      this.updateSuggestions(new Backbone.Collection(favouriteSpecies), '');
    }
  },

  /**
   * Clear the search input
   */
  deleteSearch() {
    this.$el.find('#taxon').val('');
    this.$el.find('#taxon').focus();
  },

  updateSuggestions(suggestions, searchPhrase) {
    this.suggestionsCol = suggestions;

    // reset selection
    this.selectedIndex = this.suggestionsCol.length > 0 ? 0 : -1;

    // select first
    this.suggestionsCol.length && this.suggestionsCol.at(0).set('selected', true);

    const suggestionsColView = new SuggestionsView({
      collection: this.suggestionsCol,
      removeEditBtn: this.options.removeEditBtn,
      searchPhrase,
    });
    suggestionsColView.on('childview:taxon:selected', (speciesID, edit) =>
      this.trigger('taxon:selected', speciesID, edit)
    );

    this.getRegion('suggestions').show(suggestionsColView);
  },

  _keydown(e) {
    const that = this;
    const input = e.target.value;
    if (!input) {
      return null;
    }

    switch (e.keyCode) {
      case 13:
        // press Enter
        e.preventDefault();

        // exit if no suggestions
        if (this.selectedIndex < 0 || !this.suggestionsCol) return null;

        // find which one is currently selected
        const selectedModel = this.suggestionsCol.at(this.selectedIndex);

        const species = selectedModel.toJSON();
        delete species.selected;
        this.trigger('taxon:selected', species, false);

        return false;
      case 38:
        // Up
        e.preventDefault();

        if (this.selectedIndex > 0) {
          this.suggestionsCol.at(this.selectedIndex).set('selected', false);
          this.selectedIndex--;
          this.suggestionsCol.at(this.selectedIndex).set('selected', true);
        }
        // rerender
        break;
      case 40:
        // Down
        e.preventDefault();

        if (
          this.suggestionsCol &&
          this.suggestionsCol.length && // initialized
          this.selectedIndex < this.suggestionsCol.length - 1
        ) {
          // not out of boundaries
          this.suggestionsCol.at(this.selectedIndex).set('selected', false);
          this.selectedIndex++;
          this.suggestionsCol.at(this.selectedIndex).set('selected', true);
        }
        break;
      default:
        // Other
        let text = input;

        // on keyDOWN need to add the pressed char
        let pressedChar = String.fromCharCode(e.keyCode);
        if (e.keyCode !== 8) {
          // http://stackoverflow.com/questions/19278037/javascript-non-unicode-char-code-to-unicode-character
          if (e.keyCode === 189 || e.keyCode === 109) {
            pressedChar = '-';
          }
          if (e.keyCode === 190) {
            pressedChar = '.';
          }

          text += pressedChar;
        } else {
          // Backspace - remove a char
          text = text.slice(0, text.length - 1);
        }

        // proceed if minimum length phrase was provided
        if (text.replace(/\.|\s/g, '').length >= MIN_SEARCH_LENGTH) {
          text = text.trim();

          // Clear previous timeout
          if (this.timeout !== -1) {
            clearTimeout(this.timeout);
          }

          // Set new timeout - don't run if user is typing
          this.timeout = setTimeout(() => {
            // let controller know
            that.trigger('taxon:searched', text.toLowerCase());
          }, 100);
        }
    }
    return null;
  },

  _keyup(e) {
    const that = this;
    const input = e.target.value;
    if (!input) {
      return;
    }

    switch (e.keyCode) {
      case 13:
      // press Enter
      case 38:  // eslint-disable-line
      // Up
      case 40:  // eslint-disable-line
        // Down
        break;
      default:
        // Other
        let text = input;

        // proceed if minimum length phrase was provided
        if (text.replace(/\.|\s/g, '').length >= MIN_SEARCH_LENGTH) {
          text = text.trim();

          // Clear previous timeout
          if (this.timeout !== -1) {
            clearTimeout(this.timeout);
          }

          // Set new timeout - don't run if user is typing
          this.timeout = setTimeout(() => {
            // let controller know
            that.trigger('taxon:searched', text.toLowerCase());
          }, 100);
        }
    }
  },
});
