import ModelProxyMixin from 'appkit/utils/model_proxy_mixin';

var attr = DS.attr;

export default DS.Model.extend(ModelProxyMixin, {
  start: attr(),
  slide: attr('number'),

  hasPassed: function(time) {
    return this.get('start') <= time;
  },

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  }
});
