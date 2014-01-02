/* jshint eqeqeq: false */
// http://vimeo.com/76153146

import SoundcloudMedia from 'appkit/models/media/soundcloud';

export default SoundcloudMedia.extend({
  domain: 'https://vimeo.com/',
  yql: "SELECT%20status%20FROM%20data.headers%20WHERE%20url%3D%22http%3A%2F%2Fvimeo.com%2FEXTERNAL_ID%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",

  responseDidChange: function() {
    this._super();

    if (this.get('validationState') === 'valid') {
      var start = this.get('presentation.firstSequence.start') || 0;
      this.set('start', start);
    }
  }
});
