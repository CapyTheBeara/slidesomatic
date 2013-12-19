import ModelProxyMixin from 'appkit/utils/model_proxy_mixin';

function int(num) {
  return parseInt(num, 10);
}

var attr = DS.attr,
    SEPARATOR = '-';

export default DS.Model.extend(ModelProxyMixin, {
  start: attr('number'),
  slide: attr('number'),
  urlFrag: null,

  encoded: function() {
    return [this.get('start'), this.get('slide')].join(SEPARATOR);
  }.property('start', 'slide'),

  decodeUrlFrag: function() {
    var split = this.get('urlFrag').split(SEPARATOR);

    this.setProperties({ start: int(split[0]), slide: int(split[1]) });
  }.observes('urlFrag')
});
