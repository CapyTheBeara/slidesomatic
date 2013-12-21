// http://www.slideshare.net/tboyt/presentation-27430110
// src = http://image.slidesharecdn.com/presentation-131021192733-phpapp02/95/slide-1-638.jpg?cb=1382668185

import yqlValidator from 'appkit/models/validators/yql';

export default yqlValidator.extend({
  yql: "select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Fwww.slideshare.net%2FEXTERNAL_ID%22%20and%20xpath%3D'%2F%2F*%5B%40id%3D%22svPlayerId%22%5D%2Fdiv%5B1%5D%2Fdiv%2Fdiv%5B1%5D%2Fimg'",

  success: function(self) {
    return function(obj) {
      var src = obj.query.results && obj.query.results.img.src;
      if (src) {
        var newSrc = src.split('?cb=')[0]
                        .replace(/slide-1/, 'slide-NUMBER');

        self.setProperties({
          imgEndpoint: newSrc,
          firstIndex: 1
        });
      }
    };
  }
});
