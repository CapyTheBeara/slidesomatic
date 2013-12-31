import MediaMixin from 'appkit/models/media/media_mixin';

import Youtube from 'appkit/models/media/youtube';
import Soundcloud from 'appkit/models/media/soundcloud';
import Vimeo from 'appkit/models/media/vimeo';

var attr = DS.attr;

export default DS.Model.extend(MediaMixin, {
  url: attr(),
  start: attr(),
  presentation: DS.belongsTo('presentation'),

  mediaTypes: {
    youtube: Youtube,
    soundcloud: Soundcloud,
    vimeo: Vimeo
  },
});
