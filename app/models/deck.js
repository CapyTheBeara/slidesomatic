import MediaMixin from 'appkit/models/media/media_mixin';

import Slideshare from 'appkit/models/media/slideshare';
import Speakerdeck from 'appkit/models/media/speakerdeck';
import Google from 'appkit/models/media/google';

var attr = DS.attr;

export default DS.Model.extend(MediaMixin, {
  url: attr(),
  presentation: DS.belongsTo('presentation'),

  mediaTypes: {
    speakerdeck: Speakerdeck,
    slideshare: Slideshare,
    google: Google
  }
});
