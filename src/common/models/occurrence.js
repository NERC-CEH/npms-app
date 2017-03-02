import Indicia from 'indicia';
import CONFIG from 'config';
import ImageModel from './image';

export default Indicia.Occurrence.extend({
  Image: ImageModel,

  keys: CONFIG.indicia.occurrence, // warehouse attribute keys

  validateRemote(attributes) {
    const attrs = _.extend({}, this.attributes, attributes);
    const errors = {};

    if (!attrs.abundance) {
      errors.abundance = 'missing';
    }

    if (!_.isEmpty(errors)) {
      return errors;
    }

    return null;
  },
});
