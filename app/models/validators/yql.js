var endpoint = "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",
    idRegex = /(?:com|net)\/([^\?]*)/;

export default Ember.ObjectProxy.extend({
  content: null,  // Deck
  state: Em.computed.alias('content.validationState'),
  response: undefined,

  externalId: function() {  // ie. 'tboyt/presentation-27430110'
    var match = this.get('url').match(idRegex);
    return match && match[1];
  }.property('url'),

  endpoint: function() {
    var id = this.get('externalId'),
        yql = this.get('yql').replace('EXTERNAL_ID', encodeURIComponent(id));

    return endpoint.replace('YQL_QUERY', yql);
  }.property('externalId'),

  run: function() {
    this.set('state', 'pending');

    return $.getJSON(this.get('endpoint'))
      .done( this.get('success')(this) )
      .fail( this.get('fail')(this) );
  },

  responseDidChange: function() {
    var result = this.get('response');
    if (!result) { return this.set('state', 'notFound'); }

    var docId = result.match(this.get('validationRegex'))[1];

    if (docId) {
      this.set('docId', docId);
      this.set('state', 'valid');
    }
    else { this.set('state', 'notFound'); }
  }.observes('response'),

  success: function(self) {
    return function(response) {
      // process response in child class
      self.set('state', 'valid');
    };
  },

  fail: function(self) {
    return function(res) {
      console.log('External validation request failure', res);
      self.set('state', 'requestError');
    };
  }
});
