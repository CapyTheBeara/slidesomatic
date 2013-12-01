var attr = DS.attr;

var Sequence = DS.Model.extend({
  start: attr(),
  stop: attr(),
  slide: attr(),

  includesTime: function(time) {
    return this.get('start') <= time && time < this.get('stop');
  },

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  }
});

export default Sequence;


