var endpoint = "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json";
export default Ember.ObjectProxy.extend({
  response: undefined,
  idRegex: /(?:com|net|es)\/((?:[^\/]*)\/(?:[^\/\?]*))/,

  url: function() {
    var contentUrl = this.get('content.url');
    if (contentUrl) { return contentUrl; }

    return this.get('domain') + this.get('externalId');
  }.property('domain', 'content.url'),

  externalId: function() {  // ie. 'tboyt/presentation-27430110'
    var contentExternalId = this.get('content.externalId');
    if (contentExternalId) { return contentExternalId; }

    var match = this.get('url').match(this.get('idRegex'));
    return  match && match[1];
  }.property('url', 'content.externalId'),

  endpoint: function() {
    var id = this.get('externalId'),
        yql = this.get('yql').replace('EXTERNAL_ID', encodeURIComponent(id));

    return endpoint.replace('YQL_QUERY', yql);
  }.property('externalId'),

  contentDidChange: function() {
    var url = this.get('endpoint'),
        self = this;

    this.setProperties({
      validationState: 'pending',
      'content.externalId': this.get('externalId'),
      'content.url': this.get('url')
    });

    return $.getJSON(this.get('endpoint'))
      .done(function(response) {
        Ember.run(function() {
          self.set('response', response);
        });
      })
      .fail(function(response) {
        Ember.run(function() {
          self.set('response', null);
          self.set('validationState', 'requestError');
          console.log('External validation request failure', response);
        });
      });
  }.observes('content').on('init'),

  _responseDidChange: function() {
    this.responseDidChange();
  }.observes('response'),

  responseDidChange: Ember.K
});
