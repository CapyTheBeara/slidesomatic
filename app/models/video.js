import ValidationMixin from 'appkit/models/validators/validation_mixin';

import YoutubeValidator from 'appkit/models/validators/youtube';
import SoundcloudValidator from 'appkit/models/validators/soundcloud';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, {
  url: attr(),
  start: attr(),
  presentation: DS.belongsTo('presentation'),

  time: null, // pass through for playback time

  validators: {
    youtube: YoutubeValidator,
    soundcloud: SoundcloudValidator
  }
});
