export default Ember.Handlebars.makeBoundHelper(function(slide) {
  if (slide < 4094) { return slide; }
  switch (slide) {
    case 4094:
      return 'Full Video On';
    case 4095:
      return 'Full Video Off';
  }
});
