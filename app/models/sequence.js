var attr = DS.attr;

var Sequence = DS.Model.extend({
  start: attr(),
  slide: attr('number'),

  hasPast: function(time) {
    return this.get('start') <= time;
  },

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  }
});

export default Sequence;


