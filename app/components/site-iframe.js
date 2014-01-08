// https://hacks.mozilla.org/2012/06/using-window-matchmedia-to-do-media-queries-in-javascript/

function setMatchMedia(component) {
  var widths = Array.prototype.slice.call(arguments, 1);

  widths.forEach(function(width) {
    var media = '(min-width: ' + width + 'px)',
        check = window.matchMedia(media);

    if (!component) { return; }

    check.addListener(function(mediaQueryList) {
      Ember.run(function() {
        component.set('check' + width, mediaQueryList.matches);
      });
    });
  });
}

function round(num) {
 return Math.floor(100 * num) / 100;
}

function getZoom(w) {
  var fullW = $('#site-iframe').width();
  return round(w / fullW);
}

export default Ember.Component.extend({
  elementId: 'site-iframe-wrapper',
  classNameBindings: ['show::hide'],
  show: false,
  src: null,

  check768: null,
  check992: null,
  check1200: null,

  resizeElement: function(w, h) {
    var zoom = getZoom(w),
        height = 'height:' + round(h / zoom) + 'px',
        scale = ['-webkit-', '-ms-', ''].map(function(prefix) {
          return [prefix, 'transform:scale(', zoom, ')'].join('');
        }).join(';');

    this.set('style', [height, scale].join(';'));

    Ember.run(function() {
      $('#site-iframe-wrapper').height(h);
    });
  },

  didInsertElement: function() {
    var el = $('#slide-wrapper'),
         w = el.width(),
         h = el.height();

    this.resizeElement(w, h);
    setMatchMedia(this, 768, 992, 1200); // bootstrap media query triggers
  },

  mediaCheckChanged: function() {
    var el = $('#site-iframe-wrapper'),
        w = el.width() || $('#slide-wrapper').width(),
        h = el.height();

    this.resizeElement(w, h);
  }.observes('check768', 'check992', 'check1200')
});
