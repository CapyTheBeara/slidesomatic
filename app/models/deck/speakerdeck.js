// http://www.youtube.com/watch?v=eUCRk94UVOY#t=91
// https://speakerdeck.com/patrickjholloway/ember-templates
// yql = select * from html where url='https://speakerdeck.com/patrickjholloway/ember-templates' AND xpath='//*[@id="share_pdf"]'
// https://speakerd.s3.amazonaws.com/presentations/9616ce10144e0131db267ee5813877e8/Ember_Templates.pdf
import Deck from 'appkit/models/deck/deck';

var attr = DS.attr,
    SDUrl = "https://speakerdeck.com/",
    YQL = "select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fspeakerdeck.com%2FDECK_ID'%20AND%20xpath%3D'%2F%2F*%5B%40id%3D%22share_pdf%22%5D'&format=json&diagnostics=true&callback=",
    YQLEndpoint = "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",
    docIdRegex = /presentations\/(.*)\//;

function getYqlUrl(id) {
  var yql = YQL.replace('DECK_ID', encodeURIComponent(id));
  return YQLEndpoint.replace('YQL_QUERY', yql);
}

export default Deck.extend({
  speakerdeck: true,

  deckId: function(key, value) {
    if (arguments.length > 1) {
      this.set('url', SDUrl + value);
      return value;
    }

    var url = this.get('url');

    if (!url) { return; }
    return url.split('speakerdeck.com/')[1];
  }.property('url'),

  validate: function() {
    var id = this.get('deckId'),
        yqlUrl = getYqlUrl(id),
        self = this;

    $.getJSON(yqlUrl, function(obj) {
      var href = obj.query.results && obj.query.results.a.href;

      if (href) {
        self.set('docId', href.match(docIdRegex)[1]);
        self.setValid();
      }
    });
  }.observes('url')
});
