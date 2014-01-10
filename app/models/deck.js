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
    return [this.get('domain'), this.get('id'),'/embed#slide=NUMBER'].join('');
  }.property('queryResult')
});

export default Deck;
