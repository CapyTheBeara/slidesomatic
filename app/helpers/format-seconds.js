export default Ember.Handlebars.makeBoundHelper(function(seconds, showMs) {
  if (!seconds && seconds !== 0) { return; }

  var time,
      date = new Date(seconds * 1000),
      h = date.getUTCHours(),
      m = date.getUTCMinutes(),
      s = date.getUTCSeconds();

  if (m < 10) {m = "0" + m;}
  if (s < 10) {s = "0" + s;}
  time = [h, m, s].join(":");

  if (showMs) {
    var ms = Math.round(date.getUTCMilliseconds() / 10) / 10;
    time = time + "." + ms;
  }

  return time;
});
