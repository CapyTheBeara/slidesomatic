import MediaMixin from 'appkit/models/media/media_mixin';

var attr = DS.attr;

export default DS.Model.extend(MediaMixin, {
  url: attr(),
  start: attr(),
  presentation: DS.belongsTo('presentation')
});
