import ValidationMixin from 'appkit/utils/validation_mixin';
import ModelProxyMixin from 'appkit/utils/model_proxy_mixin';

import SpeakerdeckMixin from 'appkit/models/deck/speakerdeck_mixin';
import SlideshareMixin from 'appkit/models/deck/slideshare_mixin';

var attr = DS.attr;

export default DS.Model.extend(ValidationMixin, ModelProxyMixin, {
  url: attr(),
  docId: attr(),
  presentation: DS.belongsTo('presentation'),

  validationRegex: Ember.required(),
  yqlEndpoint: "http://query.yahooapis.com/v1/public/yql?q=YQL_QUERY&format=json",
  validationResponse: undefined,

  mixins: {
    speakerdeck: SpeakerdeckMixin,
    slideshare: SlideshareMixin
  },

  validationUrl: function() {
    var id = this.get('modelId'),
        yql = this.get('yql').replace('DECK_ID', encodeURIComponent(id));
    return this.get('yqlEndpoint').replace('YQL_QUERY', yql);
  }.property('modelId'),

  // this is the external id in the user entered URL
  modelId: function(key, value) {
    if (arguments.length > 1) {
      this.set('url', this.get('baseUrl') + value);
      return value;
    }

    var url = this.get('url'),
        domain = this.get('domain');

    if (!url) { return; }
    return url.split(domain + "/")[1];
  }.property('baseUrl'),

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
