export default Ember.Mixin.create({
  valid: false,
  validationState: null, // 'pending', 'notFound', 'requestError', 'valid'
  baseUrl: Ember.required(),

  setValid: function() {
    this.set('validationState', 'valid');
    this.set('valid', true);
  },

  setInvalid: function(state) {
    this.set('validationState', state);
    this.set('valid', false);
  },

  success: function(model) {
    return function() {
      model.setValid();
    };
  },

  fail: function(model) {
    return function() {
      model.setInvalid('requestError');
    };
  },

  addMixin: function() {
    var url = this.get('url'),
        type = url.match(/:\/\/(?:www\.)?(.+)\.(?:com|net)\//)[1],
        mixin = this.get('mixins')[type],
        typeKey = this.constructor.typeKey;

    if (!mixin) { return false; }
    this.store.modelFor(typeKey).reopen(mixin);
    this.store.createRecord(typeKey); // make the mixin take effect
    return true;
  },

  validate: function() {
    var self = this;

    if (!this.get('validUrl')) {
      return this.setInvalid('notFound');
    }

    this.setInvalid('pending');

    $.getJSON(this.get('validationUrl'),
      this.get('success')(self)
    ).fail(
      this.get('fail')(self)
    );
  }.observes('url'),

  validUrl: function() {
    var match = this.get('url').match(/^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)/);
    return !!(match && match[1] && this.addMixin() && this.get('modelId'));
  }.property('url'),

  type: function() {
    return this.get('domain').split('.')[0];
  }.property('domain'),

  domain: function() {
    return this.get('baseUrl').match(/:\/\/(?:www\.)?(.+)\//)[1];
  }.property('baseUrl'),

});
