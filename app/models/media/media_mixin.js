import Slideshare from 'appkit/models/media/slideshare';
import Speakerdeck from 'appkit/models/media/speakerdeck';
import Youtube from 'appkit/models/media/youtube';
import Soundcloud from 'appkit/models/media/soundcloud';

export default Ember.Mixin.create({
  validationState: null,  // 'pending', 'invalidUrl', 'notSupported', 'requestError', 'valid'
  urlRegex: /^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net)/,

  mediaTypes: {
    slideshare: Slideshare,
    speakerdeck: Speakerdeck,
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

  validate: function() {
    var domainRoot = this.get('domainRoot');
    if (!domainRoot) { return this.set('validationState', 'invalidUrl'); }

    var mediaType = this.get('mediaTypes')[domainRoot];
    if (!mediaType) { return this.set('validationState', 'notSupported'); }

    mediaType.create({ content: this });
  }
});
