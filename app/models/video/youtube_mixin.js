// http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451

import Video from 'appkit/models/video';

var YTUrl = "http://www.youtube.com/watch?v=VIDEO_ID",
    regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

export default Ember.Mixin.create({
  youtube: true,
  baseUrl: 'http://www.youtube.com/',
  _url: '',
  validationEndpoint: 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc',

  validationUrl: function() {
    var id = this.get('modelId');
    return this.get('validationEndpoint').replace('VIDEO_ID', id);
  }.property('modelId'),

  url: function(key, value) {
    if (arguments.length > 1) {
      var split = value.split('#t=');
      if (split[1]) { this.set('start', split[1]); }

      this.set('_url', split[0]);
      return split[0];
    }

    return this.get('_url');
  }.property(),

  modelId: function(key, value) {
    if (arguments.length > 1) {
      this.set('url', YTUrl.replace('VIDEO_ID', value));
      return value;
    }

    var url = this.get('url');
    if (!url) { return undefined; }

    var match = url.match(regex);
    return match && match[7].length === 11 && match[7];
  }.property('url', 'start')
});
