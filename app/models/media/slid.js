/* jshint eqeqeq: false */
// http://slid.es/jonathangoldman/reducecomputed/

import SoundcloudMedia from 'appkit/models/media/soundcloud';

export default SoundcloudMedia.extend({
  domain: 'http://slid.es/',
  yql: "SELECT%20status%20FROM%20data.headers%20WHERE%20url%3D'http%3A%2F%2Fslid.es%2FEXTERNAL_ID%2F'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",

  responseDidChange: function() {
    this._super();

    if (this.get('validationState') === 'valid') {
      var endpoint = [this.get('domain'), this.get('externalId'),'/fullscreen#/NUMBER'].join('');

      this.setProperties({
        imgEndpoint: endpoint,
        firstIndex: 0
      });
    }
  }
});
