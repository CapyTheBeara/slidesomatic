import base64 from 'appkit/utils/base64';
import shortenUrl from 'appkit/utils/shorten_url';

function int(num) {
  return parseInt(num, 10);
}

var attr = DS.attr,
    _modes = {
      PAUSE_ON: 4090,
      PAUSE_OFF: 4091,
      SITE_ON: 4092,
      SITE_OFF: 4093,
      VIDEO_ON: 4094,
      VIDEO_OFF: 4095
    };

var Modes = Ember.Object.extend(_modes);
Modes.reopen({
  MODE_START: _modes[
    Object.keys(_modes).reduce(function(prev, cur) {
      return _modes[prev] < _modes[cur] ? prev : cur;
    })
  ],

  reversed: function() {
    return Object.keys(_modes).reduce(function(col, key) {
      col[_modes[key]] = key;
      return col;
    }, {});
  }(),

  mode: function(val) {
    return this.reversed[val];
  }
});

var modes = Modes.create();


export default DS.Model.extend({
  start: attr('number'),
  slide: attr('number', { defaultValue: 1 }),
  site: attr(),

  urlFrag: null,
  externalUrlFrag: null,
  disabled: null,  // set if a VIDEO_ON sequence was closed

  eq: function(seq) {
    return this.get('start') === seq.get('start');
  },

  mode: function(k, v) {
    if (v) {
      this.set('slide', modes[v]);
      return v;
    }

    if (this.get('isMode')) { return modes.mode(this.get('slide')); }
    else { return 'NOT_MODE'; }
  }.property(),

  isMode: function() {
    return this.get('slide') >= modes.MODE_START;
  }.property('slide'),

  isA: function(type) {  // types: slide, pause, site, video
    if (type === 'slide') { return !this.get('isMode'); }
    return this.get('mode').split('_')[0].toLowerCase() === type;
  },


  isOn: function() {
    var slide = this.get('slide');
    return slide === modes.VIDEO_ON ||
           slide === modes.SITE_ON ||
           slide === modes.PAUSE_ON;
  }.property('slide'),

  isSiteOn: function() {
    return this.get('slide') === modes.SITE_ON;
  }.property('slide'),

  isNotSiteOn: function() {
    return !this.get('isSiteOn');
  }.property('isSiteOn'),

  isNotPauseOff: function() {
    return this.get('slide') !== modes.PAUSE_OFF;
  }.property('slide'),

  encoded: function() {
    var encoded,
        slide = ('0' + base64(this.get('slide'))).slice(-2),
        start = ('00' + base64(this.get('start') * 10)).slice(-3);

    encoded = slide + start; // normal fragment always has 5 chars "0200Z"

    if (this.get('isSiteOn')) {
      encoded = encoded + encodeURIComponent(this.get('site'));
    }

    return encoded;
  }.property('start', 'slide', 'site'),

  urlFragDidChange: function() {
    var frag = this.get('urlFrag'),
        slide = base64(frag.slice(0,2)),
        start = base64(frag.slice(2)) / 10;

    this.setProperties({ start: start, slide: slide });
  }.observes('urlFrag'),

  siteFragDidChange: function() {
    var frag = this.get('siteFrag'),
        urlFrag = frag.slice(0,5),
        url = decodeURIComponent(frag.slice(5));

    this.setProperties({ urlFrag: urlFrag, site: url });
  }.observes('siteFrag')
});
