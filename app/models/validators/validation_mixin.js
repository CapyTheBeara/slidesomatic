export default Ember.Mixin.create({
  validationState: null, // 'pending', 'notFound', 'requestError', 'valid'
  urlRegex: /^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)/,

  valid: function() {
    return this.get('validationState') === 'valid';
  }.property('validationState'),

  domainRoot: function() {  // ie. 'slideshare'
    var match = this.get('url').match(this.get('urlRegex'));
    return match && match[1];
  }.property('urlMatch'),

  validator: function() {
    var type = this.get('domainRoot');
    if (!type) { return; }

    var validator = this.get('validators')[type];
    if (!validator) { return; }

    return validator.create({ content: this });
  }.property('domainRoot'),

  validate: function() {
    var validator = this.get('validator');
    if (!validator) { return this.set('validationState', 'notFound'); }
    validator.run();
  }
});
