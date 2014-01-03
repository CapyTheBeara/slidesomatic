export default Ember.Handlebars.makeBoundHelper(function(seq) {
  var slide = seq.get('slide');

  if (slide < 4092) { return slide; }
  switch (slide) {
    case 4092:
      return seq.get('site');
    case 4093:
      return 'External Site Off';
    case 4094:
      return 'Full Video On';
    case 4095:
      return 'Full Video Off';
  }
});
