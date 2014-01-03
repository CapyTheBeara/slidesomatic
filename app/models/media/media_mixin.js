var domainRootMap = [
  'speakerdeck',
  'slideshare',
  'youtube',
  'soundcloud',
  'vimeo',
  'google',
  'slid'
];

export default Ember.Mixin.create({
  externalId: null,
  validationState: null,  // 'pending', 'invalidUrl', 'notSupported', 'requestError', 'valid', 'notValidated'
  urlRegex: /^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net|es)/,

  valid: function() {
    var state = this.get('validationState');
    return state === 'valid' || state === 'validationSkipped';
  }.property('validationState'),

  domainRoot: function() {  // ie. 'slideshare'
    var url = this.get('url');
    var match = url.match(this.get('urlRegex'));
    if (!match || !match[1]) { return; }

    var split = match[1].split('.');
    return split[split.length-1];
  }.property('url'),

  routeId: function(key, value) {
    if (value) {
      this.set('domainRoot', domainRootMap[value.charAt(0)]);
      this.set('externalId', value.slice(1));
      return value;
    }

    var domainRoot = this.get('domainRoot'),
        externalId = this.get('externalId');
    return domainRootMap.indexOf(domainRoot) + externalId;
  }.property('domainRoot', 'externalId'),

  validate: function() {
    var domainRoot = this.get('domainRoot');
    if (!domainRoot) { return this.set('validationState', 'invalidUrl'); }

    var mediaType = this.get('mediaTypes')[domainRoot];
    if (!mediaType) { return this.set('validationState', 'notSupported'); }

    mediaType.create({ content: this });
  }
});
