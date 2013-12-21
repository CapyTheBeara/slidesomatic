import ValidationMixin from 'appkit/models/validators/validation_mixin';

import SlideshareValidator from 'appkit/models/validators/slideshare';
import SpeakerdeckValidator from 'appkit/models/validators/speakerdeck';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, {
  url: attr(),
  presentation: DS.belongsTo('presentation'),
  imgEndpoint: null,  // for the slide image
  firstIndex: 0,
  slide: 1,

  validators: {
    slideshare: SlideshareValidator,
    speakerdeck: SpeakerdeckValidator
  }
});
