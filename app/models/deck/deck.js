import ValidationMixin from 'appkit/utils/validation_mixin';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, {
  url: attr(),
  docId: attr(),
  presentation: DS.belongsTo('presentation'),

  baseUrl: Ember.required(),
  success: Ember.required(),
  validationRegex: Ember.required(),

  yqlEndpoint: "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",
  validationResponse: undefined,

  type: function() {
    return this.get('domain').split('.')[0];
  }.property('domain'),

  domain: function() {
    return this.get('baseUrl').match(/:\/\/(?:www\.)?(.+)\//)[1];
  }.property('baseUrl'),

  yqlUrl: function() {
    var id = this.get('deckId'),
        yql = this.get('yql').replace('DECK_ID', encodeURIComponent(id));
    return this.get('yqlEndpoint').replace('YQL_QUERY', yql);
  }.property('deckId'),

  deckId: function(key, value) {
    if (arguments.length > 1) {
      this.set('url', this.get('baseUrl') + value);
      return value;
    }

    var url = this.get('url'),
        domain = this.get('domain');

    if (!url) { return; }
    return url.split(domain + "/")[1];
  }.property('url'),

  fail: function(model) {
    return function() {
      model.setInvalid('requestError');
    };
  },

  validate: function() {
    var deckId = this.get('deckId'),
        yqlUrl = this.get('yqlUrl'),
        self = this,
        success = this.get('success'),
        fail = this.get('fail');

    if (!deckId) { return this.setInvalid('notFound'); }
    this.setInvalid('pending');

    $.getJSON(yqlUrl, success(self))
      .fail(fail(self));

  }.observes('url'),

  setValidationStatus: function() {
    var result = this.get('validationResponse');

    if (!result) { return this.setInvalid('notFound'); }

    var docId = result.match(this.get('validationRegex'))[1];

    if (docId) {
      this.set('docId', docId);
      this.setValid();
    }
    else { this.setInvalid('notFound'); }
  }.observes('validationResponse')
});
