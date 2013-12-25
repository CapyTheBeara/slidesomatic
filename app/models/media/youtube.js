// http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451

import Media from 'appkit/models/media/media';

// TODO - gdata sends bad request error for non-existent
// video ID. Swtich to YQL?
var endpoint = 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc',
    idRegex = /watch\?v=([^#]+)/;

export default Media.extend({
  domain: 'http://www.youtube.com/watch?v=',

  externalId: function() {
    var match = this.get('url').match(idRegex);
    return match && match[1];
  }.property('url'),

  endpoint: function() {
    return endpoint.replace('VIDEO_ID', this.get('externalId'));
  }.property('externalId'),

  responseDidChange: function() {
    var response = this.get('response');

    if (!response) { return this.set('validationState', 'notFound'); }
    this.set('validationState', 'valid');
  }
});
