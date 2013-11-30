import Video from 'appkit/models/video';

var YTUrl = "http://www.youtube.com/watch?v=VIDEO_ID",
    regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;

export default Video.extend({
  videoId: function(key, value) {
    if (arguments.length > 1) {  // setter
      var start = this.get('start'),
          path = start ? [value, '#t=', start].join('') : value;

      this.set('url', YTUrl.replace('VIDEO_ID', path));
      return value;
    }

    // getter
    var match = this.get('url').match(regex);
    return match && match[7].length === 11 && match[7];
  }.property('url', 'start')
});
