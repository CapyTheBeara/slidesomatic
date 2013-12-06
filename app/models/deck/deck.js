var attr = DS.attr;

export default DS.Model.extend({
  url: attr(),
  docId: attr(),
  presentation: DS.belongsTo('presentation'),

  error: null,
  valid: false,

  setError: function(msg) {
    this.set('error', msg);
    this.set('valid', false);
  },

  setValid: function() {
    this.set('error', null);
    this.set('valid', true);
    return true;
  }
});
