export default function timeFromUrl(url) {
  var match = url.match(/t=(?:(\d*)h)?(?:(\d*)m)?(\d*)s/);
  if (!match) { return; }

  var secs = +match[3] || 0;

  if (match[2]) { secs += +match[2] * 60; }
  if (match[1]) { secs += +match[1] * 3600; }
  return secs;
}
