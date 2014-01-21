/* jshint eqeqeq: false */

import ResourceMixin from 'appkit/models/support/resource_model_mixin';

var Deck = DS.Model.extend(
  ResourceMixin, {

  speakerdeckFirstIndex: 0,
  slideshareFirstIndex: 1,
  googleFirstIndex: 1,
  slidFirstIndex: 0,

  firstIndex: function() {
    return this.getProperty('FirstIndex');
  }.property('domainRoot'),

  slideEndpoint: function() {
    return this.getProperty('Endpoint');
  }.property('queryResult', 'domainRoot'),

  speakerdeckEndpoint: function() {
    var res = this.get('queryResult'),
        href = res.query.results.a.href;
    return href.split(/\/[^/]*$/)[0] + "/slide_NUMBER.jpg";
  }.property('queryResult'),

  slideshareEndpoint: function() {
    var res = this.get('queryResult'),
        src = res.query.results.img.src;
    return src.split('?cb=')[0]
              .replace(/slide-1/, 'slide-NUMBER');
  }.property('queryResult'),

  slidEndpoint: function() {
    return this.get('url') + '/fullscreen#/NUMBER';
  }.property('queryResult'),

  googleEndpoint: function() {
    return [this.get('domain'), this.get('externalId'),'/embed#slide=NUMBER'].join('');
  }.property('queryResult')
});

Deck.reopenClass({
  find: function(modelType, params) {
    var self = this;

    return this.store.find(modelType, params).then(
      function(res) {
        var model = res.get('firstObject');
        model.setPropertiesFromParams(params);
        model.set('validationState', 'valid');
        return model;
      },
      function(res) {
        console.log('requestError', res);

        return self.store.createRecord(modelType, {
          validationState: 'requestError'
        });
      }
    );
  }

});

export default Deck;
