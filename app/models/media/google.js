/* jshint eqeqeq: false */
// https://docs.google.com/presentation/d/1e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA/edit?pli=1
// https://docs.google.com/presentation/d/1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI/edit?pli=1#slide=id.g177d510c8_0342

import SoundcloudMedia from 'appkit/models/media/soundcloud';

export default SoundcloudMedia.extend({
  domain: 'https://docs.google.com/presentation/d/',
  idRegex: /presentation\/d\/([^\/]+)/,
  yql: "SELECT%20status%20FROM%20data.headers%20WHERE%20url%3D'https%3A%2F%2Fdocs.google.com%2Fpresentation%2Fd%2FEXTERNAL_ID'&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=",

  // yql will throw an error if deck is too large
  // so have to skip validation
  contentDidChange: function() {
    var endpoint = [this.get('domain'), this.get('externalId'),'/embed#slide=NUMBER'].join('');

    this.setProperties({
      validationState: 'validationSkipped',
      'content.externalId': this.get('externalId'),
      'content.url': this.get('url'),
      imgEndpoint: endpoint,
      firstIndex: 1
    });
  }.observes('content').on('init')

  // responseDidChange: function() {
  //   this._super();

  //   if (this.get('validationState') === 'valid') {
  //     var endpoint = [this.get('domain'), '/', this.get('externalId'),'/embed#slide=NUMBER'].join('');

  //     this.setProperties({
  //       imgEndpoint: endpoint,
  //       firstIndex: 1
  //     });
  //   }
  // }
});
