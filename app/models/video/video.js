import ValidationMixin from 'appkit/utils/validation_mixin';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, {
  start: attr('number', { defaultValue: 0 }),
  presentation: DS.belongsTo('presentation')
});
