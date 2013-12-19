import SlideshareValidator from 'appkit/models/validators/slideshare';
import SpeakerdeckValidator from 'appkit/models/validators/speakerdeck';

var attr = DS.attr,
    urlRegex = /^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)\/([^\?]*)/,
    validators = {
      slideshare: SlideshareValidator,
      speakerdeck: SpeakerdeckValidator
    };

export default DS.Model.extend({
  url: attr(),
  docId: attr(),
  presentation: DS.belongsTo('presentation'),

  validationState: null, // 'pending', 'notFound', 'requestError', 'valid'

  valid: function() {
    return this.get('validationState') === 'valid';
  }.property('validationState'),

  urlMatch: function() {
    return this.get('url').match(urlRegex);
  }.property('url'),

  domainRoot: function() {  // ie. 'slideshare'
    var match = this.get('urlMatch');
    return match && match[1];
  }.property('urlMatch'),

  slideshare: function() {
    return this.get('domainRoot') === 'slideshare';
  }.property('domainRoot'),

  speakerdeck: function() {
    return this.get('domainRoot') === 'speakerdeck';
  }.property('domainRoot'),

  externalId: function() {  // ie. 'tboyt/presentation-27430110'
    var match = this.get('urlMatch');
    return match && match[2];
  }.property('urlMatch'),

  validator: function() {
    var type = this.get('domainRoot');
    if (!type) { return; }

    var validator = validators[type];
    if (!validator) { return; }

    return validator.create({ content: this });
  }.property('domainRoot'),

  validate: function() {
    var validator = this.get('validator');
    if (!validator) { return this.set('validationState', 'notFound'); }
    validator.run();
  }
});
