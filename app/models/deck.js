import ValidationMixin from 'appkit/models/validators/validation_mixin';

import SlideshareValidator from 'appkit/models/validators/slideshare';
import SpeakerdeckValidator from 'appkit/models/validators/speakerdeck';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, {
  url: attr(),
  docId: attr(),
  presentation: DS.belongsTo('presentation'),

  validators: {
    slideshare: SlideshareValidator,
    speakerdeck: SpeakerdeckValidator
  }
});
