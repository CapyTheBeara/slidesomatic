export default Ember.Handlebars.makeBoundHelper(function(seconds) {
  if (!seconds) { return; }
  var date = new Date(seconds * 1000),
      h = date.getUTCHours(),
      m = date.getUTCMinutes(),
      s = date.getSeconds();

  if (m < 10) {m = "0" + m;}
  if (s < 10) {s = "0" + s;}

  return [h, m, s].join(":");
});
