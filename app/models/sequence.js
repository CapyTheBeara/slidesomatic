import ModelProxyMixin from 'appkit/utils/model_proxy_mixin';

var attr = DS.attr,
    SEPARATOR = '-';

export default DS.Model.extend(ModelProxyMixin, {
  start: attr(),
  slide: attr('number', { defaultValue: 1 }),
  urlFrag: null,

  hasPassed: function(time) {
    return this.get('start') <= time;
  },

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  },

  encoded: function() {
    return [this.get('start'), this.get('slide')].join(SEPARATOR);
  }.property('start', 'slide'),

  decodeUrlFrag: function() {
    var split = this.get('urlFrag').split(SEPARATOR);

    this.setProperties({ start: split[0], slide: split[1] });
  }.observes('urlFrag')
});
