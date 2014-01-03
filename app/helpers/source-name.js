var map = {
  speakerdeck: 'Speaker Deck',
  slideshare: 'SlideShare',
  youtube: 'YouTube',
  soundcloud: 'SoundCloud',
  vimeo: 'Vimeo',
  google: 'Google Drive',
  slid: 'Slid.es'
};

export default Ember.Handlebars.makeBoundHelper(function(root) {
  return map[root];
});
