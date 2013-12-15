// http://www.slideshare.net/tboyt/presentation-27430110

import Deck from 'appkit/models/deck/deck';

export default Deck.extend({
  slideshare: true,
  baseUrl: "http://www.slideshare.net/",
  yql: "select%20thumbnail%20from%20json%20where%20url%3D%22http%3A%2F%2Fwww.slideshare.net%2Fapi%2Foembed%2F2%3Furl%3Dhttp%3A%2F%2Fwww.slideshare.net%2FDECK_ID%26format%3Djson%22",
  validationRegex: /_thumbnails\/(.*)-thumbnail/,

  success: function(model) {
    return function(obj) {
      var thumbnail = obj.query.results && obj.query.results.json.thumbnail;
      model.set('validationResponse', thumbnail);
    };
  }
});

