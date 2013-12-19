export default Ember.ObjectProxy.extend({
  content: null,  // Deck
  status: Em.computed.alias('content.validationState'),
  response: undefined,
  endpoint: "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",

  run: function() {
    this.set('status', 'pending');

    var id = this.get('externalId'),
        yql = this.get('yql').replace('EXTERNAL_ID', encodeURIComponent(id)),
        endpoint = this.get('endpoint').replace('YQL_QUERY', yql);

    return $.getJSON(endpoint,
      this.get('success')(this)
    ).fail(
      this.get('fail')(this)
    );
  },

  responseDidChange: function() {
    var result = this.get('response');
    if (!result) { return this.set('status', 'notFound'); }

    var docId = result.match(this.get('validationRegex'))[1];

    if (docId) {
      this.set('docId', docId);
      this.set('status', 'valid');
    }
    else { this.set('status', 'notFound'); }
  }.observes('response'),

  fail: function(self) {
    return function(res) {
      console.log('External validation request failure', res);
      self.set('status', 'requestError');
    };
  }
});
