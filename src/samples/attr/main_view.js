/** ****************************************************************************
 * Sample Attribute main view.
 *****************************************************************************/
import $ from 'jquery';
import Marionette from 'backbone.marionette';
import Device from 'helpers/device';
import DateHelp from 'helpers/date';
import StringHelp from 'helpers/string';
import Log from 'helpers/log';
import JST from 'JST';
import CONFIG from 'config';

// http://stackoverflow.com/questions/846221/logarithmic-slider
function LogSlider(options = {}) {
  this.minpos = options.minpos || 0;
  this.maxpos = options.maxpos || 100;
  this.minlval = Math.log(options.minval || 1);
  this.maxlval = Math.log(options.maxval || 100000);

  this.scale = (this.maxlval - this.minlval) / (this.maxpos - this.minpos);
}

LogSlider.prototype = {
  // Calculate value from a slider position
  value(position) {
    return Math.exp(((position - this.minpos) * this.scale) + this.minlval);
  },
  // Calculate slider position from a value
  position(value) {
    return this.minpos + ((Math.log(value) - this.minlval) / this.scale);
  },
};

const logsl = new LogSlider({ maxpos: 100, minval: 1, maxval: 500 });

export default Marionette.View.extend({
  initialize(options) {
    switch (options.attr) {
      case 'habitat':
      case 'fine-habitat':
      case 'wooded':
      case 'grazing':
      case 'soil':
      case 'gravel':
      case 'litter':
      case 'lichens':
        this.template = JST['common/radio'];
        break;

      case 'management':
        this.template = JST['common/checkbox'];
        break;

      case 'identifiers':
        this.template = JST['common/input'];
        break;

      default:
        this.template = JST[`samples/attr/${options.attr}`];
    }
  },

  events: {
    'click input[type="radio"]': 'saveNumber',
    'input input[type="range"]': 'updateRangeInputValue',
    'change input[type="number"]': 'updateRangeSliderValue',
  },

  saveNumber() {
    // unset slider val
    const $rangeOutput = this.$el.find('#rangeVal');
    $rangeOutput.val('');
    this.trigger('save');
  },

  getValues() {
    const values = {};
    let value;
    const attr = this.options.attr;
    let $inputs;
    switch (attr) {
      case 'date': {
        value = this.$el.find('input').val();
        const date = new Date(value);
        if (date.toString() !== 'Invalid Date') {
          values[attr] = new Date(date);
        }
        break;
      }
      case 'wooded':
      case 'habitat':
      case 'fine-habitat':
      case 'grazing':
      case 'soil':
      case 'gravel':
      case 'litter':
      case 'lichens':
        $inputs = this.$el.find('input');
        $inputs.each((int, elem) => {
          if ($(elem).prop('checked')) {
            values[attr] = $(elem).val();
          }
        });
        break;

      case 'comment':
        value = this.$el.find('textarea').val();
        values[attr] = StringHelp.escape(value);
        break;

      case 'management':
        values[attr] = [];
        $inputs = this.$el.find('input');
        $inputs.each((int, elem) => {
          if ($(elem).prop('checked')) {
            values[attr].push($(elem).val());
          }
        });
        break;

      case 'identifiers':
        value = this.$el.find('input').val();
        values[attr] = StringHelp.escape(value);
        break;

      case 'vegetation':
        const vegetation = {};
        // todo: validate
        value = this.$el.find('input[name="<=10cm"]').val();
        vegetation['<=10cm'] = parseInt(value, 10);
        value = this.$el.find('input[name="11-30cm"]').val();
        vegetation['11-30cm'] = parseInt(value, 10);
        value = this.$el.find('input[name="31-100cm"]').val();
        vegetation['31-100cm'] = parseInt(value, 10);
        value = this.$el.find('input[name="101-300cm"]').val();
        vegetation['101-300cm'] = parseInt(value, 10);
        value = this.$el.find('input[name=">300cm"]').val();
        vegetation['>300cm'] = parseInt(value, 10);

        values[attr] = vegetation;
        break;
      default:
    }

    return values;
  },

  serializeData() {
    let templateData = {};
    let selected;
    switch (this.options.attr) {
      case 'date':
        templateData.date = DateHelp.toDateInputValue(this.model.get('date'));
        templateData.maxDate = DateHelp.toDateInputValue(new Date());
        break;

      case 'habitat':
        selected = this.model.get('habitat') || {};
        templateData = {
          message: 'Please select a broad habitat. Please ensure your choice of habitat matches the species list you are using.',
          selection: Object.keys(CONFIG.indicia.sample.habitat._values),
          selected: selected.broad,
        };
        break;

      case 'fine-habitat':
        selected = this.model.get('habitat') || {};
        const fineHabitat = CONFIG.indicia.sample.habitat._values[selected.broad];
        templateData = {
          message: 'Please select your fine habitat.',
          selection: Object.keys(fineHabitat.values),
          selected: selected.fine,
        };
        break;

      case 'wooded':
        selected = this.model.get('wooded');
        templateData = {
          message: 'How wooded is your plot?',
          selection: Object.keys(CONFIG.indicia.sample.wooded.values),
          selected,
        };
        break;

      case 'grazing':
        templateData.message = 'Which animals were grazing?';
      case 'soil':
      case 'gravel':
      case 'litter':
      case 'lichens':
        selected = this.model.get(this.options.attr);
        templateData.selection = Object.keys(CONFIG.indicia.sample[this.options.attr].values);
        templateData.selected = selected;
        break;

      case 'management':
        selected = this.model.get('management') || [];
        templateData = {
          selection: Object.keys(CONFIG.indicia.sample.management._values),
          selected,
        };
        break;

      case 'comment':
        templateData.value = this.model.get(this.options.attr);
        break;
      case 'identifiers':
        templateData.message = 'Please add additional recorders here.';
        templateData.value = this.model.get(this.options.attr);
        break;

      case 'vegetation':
        templateData.value = this.model.get(this.options.attr) || {};
        break;

      default:
        Log('Samples:Attribute:MainView: no such attribute', 'e');
        return null;
    }

    return templateData;
  },

  updateRangeSliderValue(e) {
    const $input = $(e.target);
    const $rangeOutput = this.$el.find('#range');

    const value = logsl.position($input.val()).toFixed(0);
    $rangeOutput.val(value);

    // unset ranges selection
    const $inputs = this.$el.find('input[type="radio"]');
    $inputs.each((int, elem) => {
      $(elem).prop('checked', false);
    });
  },

  updateRangeInputValue(e) {
    const $input = $(e.target);
    if (!$input.val()) {
      // no need to do anything on input clear
      return;
    }
    const $rangeOutput = this.$el.find('#rangeVal');

    const value = logsl.value($input.val()).toFixed(0);
    $rangeOutput.val(value);

    // unset ranges selection
    const $inputs = this.$el.find('input[type="radio"]');
    $inputs.each((int, elem) => {
      $(elem).prop('checked', false);
    });
  },

  onAttach() {
    let $input;
    switch (this.options.attr) {
      case 'date':
        $input = this.$el.find('input').focus();
        if (Device.isAndroid()) {
          const options = {
            date: new Date(this.model.get('date')),
            mode: 'date',
            androidTheme: 5,
            allowOldDates: true,
            allowFutureDates: false,
          };

          window.datePicker.show(options, (date) => {
            $input.val(DateHelp.toDateInputValue(new Date(date)));
          });
        }
        break;
      case 'comment':
        $input = this.$el.find('textarea').focus();
        if (window.cordova && Device.isAndroid()) {
          window.Keyboard.show();
          $input.focusout(() => {
            window.Keyboard.hide();
          });
        }
        break;
      case 'identifiers':
        $input = this.$el.find('input').focus();
        if (window.cordova && Device.isAndroid()) {
          window.Keyboard.show();
          $input.focusout(() => {
            window.Keyboard.hide();
          });
        }
        break;
      default:
    }
  },
});

