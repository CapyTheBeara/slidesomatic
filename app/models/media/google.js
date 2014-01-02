/* jshint eqeqeq: false */
// https://docs.google.com/presentation/d/1e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA/edit?pli=1

import SoundcloudMedia from 'appkit/models/media/soundcloud';

export default SoundcloudMedia.extend({
  domain: 'https://docs.google.com/presentation/d',
  idRegex: /presentation\/d\/([^\/]+)/,
  yql: "SELECT%20status%20FROM%20data.headers%20WHERE%20url%3D'https%3A%2F%2Fdocs.google.com%2Fpresentation%2Fd%2FEXTERNAL_ID'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",

  responseDidChange: function() {
    this._super();

    if (this.get('validationState') === 'valid') {
      var endpoint = [this.get('domain'), '/', this.get('externalId'),'/embed#slide=NUMBER'].join('');

      this.setProperties({
        imgEndpoint: endpoint,
        firstIndex: 1
      });
    }
  }
});
