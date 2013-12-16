import ValidationMixin from 'appkit/utils/validation_mixin';
import ModelProxyMixin from 'appkit/utils/model_proxy_mixin';

import YoutubeMixin from 'appkit/models/video/youtube_mixin';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, ModelProxyMixin, {
  start: attr('number', { defaultValue: 0 }),
  presentation: DS.belongsTo('presentation'),

  mixins: {
    youtube: YoutubeMixin
  }
});
