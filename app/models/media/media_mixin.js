import Slideshare from 'appkit/models/media/slideshare';
import Speakerdeck from 'appkit/models/media/speakerdeck';
import Youtube from 'appkit/models/media/youtube';
import Soundcloud from 'appkit/models/media/soundcloud';

var domainRootMap = [
  'speakerdeck',
  'slideshare',
  'youtube',
  'soundcloud'
];

export default Ember.Mixin.create({
  externalId: null,
  validationState: null,  // 'pending', 'invalidUrl', 'notSupported', 'requestError', 'valid'
  urlRegex: /^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)/,

  mediaTypes: {
    speakerdeck: Speakerdeck,
    slideshare: Slideshare,
    youtube: Youtube,
    soundcloud: Soundcloud
  },

  valid: function() {
    return this.get('validationState') === 'valid';
  }.property('validationState'),

  domainRoot: function() {  // ie. 'slideshare'
    var url = this.get('url');
    var match = url.match(this.get('urlRegex'));
    return match && match[1];
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
