// http://developer.yahoo.com/yql/console/#h=select+thumbnail+from+json+where+url%3D%22http%3A%2F%2Fwww.slideshare.net%2Fapi%2Foembed%2F2%3Furl%3Dhttp%3A%2F%2Fwww.slideshare.net%2Ftboyt%2Fpresentation-27430110%26format%3Djson%22

// http://query.yahooapis.com/v1/public/yql?q=select%20thumbnail%20from%20json%20where%20url%3D%22http%3A%2F%2Fwww.slideshare.net%2Fapi%2Foembed%2F2%3Furl%3Dhttp%3A%2F%2Fwww.slideshare.net%2Ftboyt%2Fpresentation-27430110%26format%3Djson%22&format=json&callback=
// presentation-131021192733-phpapp02

var attr = DS.attr,
    SDUrl = "http://www.slideshare.net/",
    YQL = 'select thumbnail from json where url="http://www.slideshare.net/api/oembed/2?url=http://www.slideshare.net/DECK_ID&format=json"',
    YQLEndpoint = "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",
    thumbnailRegex =/_thumbnails\/(.*)-thumbnail/;

function getYqlUrl(id) {
  var yql = encodeURIComponent(YQL.replace('DECK_ID', id));
  return YQLEndpoint.replace('YQL_QUERY', yql);
}

export default DS.Model.extend({
  url: attr(),
  docId: attr().property('deckId'),
  presentation: DS.belongsTo('presentation'),

  error: null,
  valid: false,

  deckId: function() {
    var url = this.get('url');

    if (!url) { return; }
    return url.split('slideshare.net/')[1];
  }.property('url'),

  validate: function() {
    var id = this.get('deckId'),
        docId = this.get('docId'),
        yqlUrl = getYqlUrl(id),
        self = this;

    if (docId) { return this.setValid(); }
    if (!id) { return this.setError('Invalid SlideShare URL'); }

    $.getJSON(yqlUrl, function(obj) {
      var thumbnail = obj.query.results && obj.query.results.json.thumbnail;

      self.set('docId', thumbnail.match(thumbnailRegex)[1]);
      self.setValid();
    }).fail(function() {
      self.setError('There was a problem with the request. Please try again later.');
    });
  }.observes('url', 'docId'),

  setError: function(msg) {
    this.set('error', msg);
    this.set('valid', false);
  },

  setValid: function() {
    this.set('error', null);
    this.set('valid', true);
    return true;
  }
});

