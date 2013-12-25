/* jshint eqeqeq: false */
// https://soundcloud.com/armadamusic/armin-van-buuren-shivers

import Media from 'appkit/models/media/media';

export default Media.extend({
  yql: "SELECT%20status%20FROM%20data.headers%20WHERE%20url%3D%22https%3A%2F%2Fsoundcloud.com%2FEXTERNAL_ID%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",

  responseDidChange: function() {
    var response = this.get('response'),
        statusCode = response.query.results && response.query.results.resources.status;

    if (statusCode == 200) { return this.set('validationState', 'valid'); }
    this.set('validationState', 'notFound');
  }
});
