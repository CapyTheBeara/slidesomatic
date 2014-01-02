// http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451

import MediaQuery from 'appkit/models/media/media_query';

// TODO - gdata sends bad request error for non-existent
// video ID. Swtich to YQL?
var endpoint = 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc';

export default MediaQuery.extend({
  domain: 'http://www.youtube.com/watch?v=',
  idRegex: /watch\?v=([^#|&]+)(?:#t=(.+))?/,

  endpoint: function() {
    return endpoint.replace('VIDEO_ID', this.get('externalId'));
  }.property('externalId'),

  responseDidChange: function() {
    var response = this.get('response');

    if (!response) { return this.set('validationState', 'notFound'); }
    this.set('validationState', 'valid');

    var start = this.get('presentation.firstSequence.start') ||
                this.get('url').match(this.get('idRegex'))[2] || 0;
    this.set('start', start);
  }
});
