var endpoint = "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",
    idRegex = /(?:com|net)\/([^\?]*)/;

export default Ember.ObjectProxy.extend({
  content: null,
  response: null,
  state: Em.computed.alias('content.validationState'),
  firstIndexBinding: 'content.firstIndex',
  imgEndpointBinding: 'content.imgEndpoint',

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
    this.set('response', undefined);

    return $.getJSON(this.get('endpoint'))
      .done( this.get('success')(this) )
      .fail( this.get('fail')(this) );
  },

  responseDidChange: function() {
    var endpoint = this.get('response');

    if (endpoint) { return this.set('state', 'valid'); }
    if (endpoint === undefined) { return; }
    return this.set('state', 'notFound');
  }.observes('response'),

  imgEndpointDidChange: function() {
    this.set('response', true);
  }.observes('imgEndpoint'),

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
