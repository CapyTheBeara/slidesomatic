// http://www.youtube.com/watch?v=8MYcjaar7Vw#t=1451

import Video from 'appkit/models/video';

var YTUrl = "http://www.youtube.com/watch?v=VIDEO_ID",
    regex = /^.*(?:(?:youtu.be\/)|(?:v\/)|(?:\/u\/\w\/)|(?:embed\/)|(?:watch\?))\??v?=?([^#\&\?]*)[^#]*(?:(?:#t=)(\d*))?/;

export default Ember.Mixin.create({
  youtube: true,
  baseUrl: 'http://www.youtube.com/',
  _url: '',
  validationEndpoint: 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc',

  validationUrl: function() {
    var id = this.get('modelId');
    return this.get('validationEndpoint').replace('VIDEO_ID', id);
  }.property('modelId'),

  modelId: function(key, value) {
    if (arguments.length > 1) {
      this.set('url', YTUrl.replace('VIDEO_ID', value));
      return value;
    }

    var url = this.get('url');
    if (!url) { return undefined; }

    var match = url.match(regex);
    if (match[2]) { this.set('start', match[2]); }
    this.set('url', url.replace(/#t=\d+/, ''));

    return match && match[1].length === 11 && match[1];
  }.property('url')
});
