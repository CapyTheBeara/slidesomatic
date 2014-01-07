export default Ember.Handlebars.makeBoundHelper(function(seq) {
  var slide = seq;

  if (!seq.get('isMode')) { return seq.get('slide'); }

  switch (seq.get('mode')) {
    case 'SITE_ON':
      return seq.get('site');
    case 'SITE_OFF':
      return 'External Site Off';
    case 'VIDEO_ON':
      return 'Full Video On';
    case 'VIDEO_OFF':
      return 'Full Video Off';
    case 'PAUSE_ON':
      return 'Pause';
    case 'PAUSE_OFF':
      return 'Pause Off';
  }
});
