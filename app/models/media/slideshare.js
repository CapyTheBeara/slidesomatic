// http://www.slideshare.net/tboyt/presentation-27430110
// src = http://image.slidesharecdn.com/presentation-131021192733-phpapp02/95/slide-1-638.jpg?cb=1382668185

import MediaQuery from 'appkit/models/media/media_query';

export default MediaQuery.extend({
  domain: 'http://www.slideshare.net/',
  yql: "select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.slideshare.net%2FEXTERNAL_ID%22%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22svPlayerId%22%5D%2Fdiv%5B1%5D%2Fdiv%2Fdiv%5B1%5D%2Fimg'",

  responseDidChange: function() {
    var response = this.get('response'),
        src = response.query.results && response.query.results.img.src;

    if (!src) { return this.set('validationState', 'notFound'); }

    var imgEndpoint = src.split('?cb=')[0]
                         .replace(/slide-1/, 'slide-NUMBER');

    this.setProperties({
      'imgEndpoint': imgEndpoint,
      'firstIndex': 1,
      'validationState': 'valid'
    });
  }
});
