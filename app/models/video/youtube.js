// http://www.youtube.com/watch?v=8GKmkD1pUG0

import Video from 'appkit/models/video/video';

var YTUrl = "http://www.youtube.com/watch?v=VIDEO_ID",
    ytDataUrl = 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc',
    regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

export default Video.extend({
  type: 'youtube',
  youtube: true,
  _url: '',

  url: function(key, value) {
    if (arguments.length > 1) {
      var split = value.split('#t=');
      if (split[1]) { this.set('start', split[1]); }

      this.set('_url', split[0]);
      return split[0];
    }

    return this.get('_url');
  }.property(),

  videoId: function(key, value) {
    if (arguments.length > 1) {
      this.set('url', YTUrl.replace('VIDEO_ID', value));
      return value;
    }

    var url = this.get('url');
    if (!url) { return undefined; }

    var match = url.match(regex);
    return match && match[7].length === 11 && match[7];
  }.property('url', 'start'),

  validate: function() {
    var id = this.get('videoId'),
        dataUrl = ytDataUrl.replace('VIDEO_ID', id),
        self = this;

    if (!id) { return this.setError('Invalid YouTube URL'); }

    $.getJSON(dataUrl, function() {
      self.set('error', null);
      self.set('valid', true);
    }).fail(function() {
      self.setError('That video does not appear to exist');
    });
  }.observes('url')
});
