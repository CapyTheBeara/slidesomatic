// http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451

import BaseValidator from 'appkit/models/validators/yql';

var endpoint = 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc',
    idRegex = /watch\?v=([^#]+)/;

export default BaseValidator.extend({
  externalId: function() {
    var match = this.get('url').match(idRegex);
    return match && match[1];
  }.property('url'),

  endpoint: function() {
    return endpoint.replace('VIDEO_ID', this.get('externalId'));
  }.property('externalId')
});
