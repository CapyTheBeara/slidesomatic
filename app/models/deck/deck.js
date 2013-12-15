import ValidationMixin from 'appkit/utils/validation_mixin';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, {
  url: attr(),
  docId: attr(),
  presentation: DS.belongsTo('presentation')
});
