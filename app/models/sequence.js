import base64 from 'appkit/utils/base64';

function int(num) {
  return parseInt(num, 10);
}

var attr = DS.attr;

export default DS.Model.extend({
  start: attr('number'),
  slide: attr('number'),
  urlFrag: null,

  encoded: function() {  // fragment always has 5 chars "0200Z"
    var start = base64(this.get('start') * 10),
        slide = base64(this.get('slide'));

    return ('0' + slide).slice(-2) + ('00' + start).slice(-3);
  }.property('start', 'slide'),

  urlFragDidChange: function() {
    var frag = this.get('urlFrag'),
        slide = base64(frag.slice(0,2)),
        start = base64(frag.slice(2)) / 10;

    this.setProperties({ start: start, slide: slide });
  }.observes('urlFrag')
});
