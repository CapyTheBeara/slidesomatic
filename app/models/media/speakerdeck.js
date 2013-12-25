// https://speakerdeck.com/jrallison/ember-components
// href = "https://speakerd.s3.amazonaws.com/presentations/0549acd03e2f01301b0d22000a8f8683/APIDesignSecrets.pdf"

import Media from 'appkit/models/media/media';

export default Media.extend({
  domain: 'https://speakerdeck.com/',
  yql: "select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fspeakerdeck.com%2FEXTERNAL_ID'%20AND%20xpath%3D'%2F%2F*%5B%40id%3D%22share_pdf%22%5D'&format=json",

  responseDidChange: function() {
    var response = this.get('response'),
        href = response.query.results && response.query.results.a.href;

    if (!href) { return this.set('validationState', 'notFound'); }

    var imgEndpoint = href.split(/\/[^/]*$/)[0] + "/slide_NUMBER.jpg";

    this.setProperties({
      'imgEndpoint': imgEndpoint,
      'firstIndex': 0,
      'validationState': 'valid'
    });
  }
});
