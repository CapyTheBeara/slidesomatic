var endpoint = "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",
    idRegex = /(?:com|net)\/([^\?]*)/;

export default Ember.ObjectProxy.extend({
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

  contentDidChange: function() {
    var url = this.get('endpoint'),
        self = this;

    this.set('validationState', 'pending');

    return $.getJSON(this.get('endpoint'))
      .done(function(response) {
        self.set('response', response);
      })
      .fail(function(response) {
        self.set('response', null);
        self.set('validationState', 'requestError');
        console.log('External validation request failure', response);
      });
  }.observes('content').on('init'),

  _responseDidChange: function() {
    this.responseDidChange();
  }.observes('response'),

  responseDidChange: Ember.K
});
