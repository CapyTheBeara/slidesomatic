export default Ember.Handlebars.makeBoundHelper(function(seconds, showMs) {
  if (!seconds && seconds !== 0) { return; }

  var ms, time,
      date = new Date(seconds * 1000),
      h = date.getUTCHours(),
      m = date.getUTCMinutes(),
      s = date.getUTCSeconds();

  if (m < 10) {m = "0" + m;}

  if (showMs) {
    ms = Math.round(date.getUTCMilliseconds() / 100);
    if (ms === 10) {
      s += 1;
      ms = 0;
    }
  }

  if (s < 10) {s = "0" + s;}

  time = [h, m, s].join(":");
  if (showMs) { time = time + "." + ms; }
  return time;
});
