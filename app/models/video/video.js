var attr = DS.attr;

export default DS.Model.extend({
  start: attr('number', { defaultValue: 0 }),
  presentation: DS.belongsTo('presentation'),
  error: null,
  valid: false,

  setError: function(msg) {
    this.set('error', msg);
    this.set('valid', false);
  }
});
