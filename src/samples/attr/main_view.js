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
    // grazing option has free text as well
    if (this.options.attr === 'grazing') {
      return;
    }
    // unset slider val
    const $rangeOutput = this.$el.find('#rangeVal');
    $rangeOutput.val('');
    this.trigger('save');
  },

  getValues() {
    function parseVegetation(value) {
      const parsedValue = parseInt(value, 10);
      if (isNaN(parsedValue) || parsedValue > 3 || parsedValue < 0) {
        return null;
      }

      return parsedValue;
    }

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

      case 'grazing':
        const text = this.$el.find('input[type="text"]').val();
        values.grazing = {
          text: StringHelp.escape(text),
        };
        $inputs = this.$el.find('input');
        $inputs.each((int, elem) => {
          if ($(elem).prop('checked')) {
            values.grazing.selected = $(elem).val();
          }
        });

        break;

      case 'identifiers':
        value = this.$el.find('input').val();
        values[attr] = StringHelp.escape(value);
        break;

      case 'vegetation':
        const vegetation = {};

        value = this.$el.find('input[name="<=10cm"]').val();
        vegetation['<=10cm'] = parseVegetation(value);

        value = this.$el.find('input[name="11-30cm"]').val();
        vegetation['11-30cm'] = parseVegetation(value);

        value = this.$el.find('input[name="31-100cm"]').val();
        vegetation['31-100cm'] = parseVegetation(value);

        value = this.$el.find('input[name="101-300cm"]').val();
        vegetation['101-300cm'] = parseVegetation(value);

        value = this.$el.find('input[name=">300cm"]').val();
        vegetation['>300cm'] = parseVegetation(value);

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
          message: 'Please select a broad habitat. Please ensure your choice of ' +
          'habitat matches the species list you are using.',
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

      case 'grazing':
      case 'comment':
        templateData.value = this.model.get(this.options.attr);
        break;
      case 'identifiers':
        templateData.message = 'Please only add additional recorders here.';
        templateData.value = this.model.get(this.options.attr);
        break;

      case 'vegetation':
        templateData.value = this.model.get(this.options.attr) || {};
        break;

      default:
        Log('Samples:Attribute:MainView: no such attribute.', 'e');
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

