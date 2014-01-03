import base64 from 'appkit/utils/base64';
import shortenUrl from 'appkit/utils/shorten_url';

function int(num) {
  return parseInt(num, 10);
}

var attr = DS.attr,
    MODE_START = 4092,
    MODE_EXTERNAL_URL_ON = 4092,
    MODE_EXTERNAL_URL_OFF = 4093,
    MODE_FULL_VIDEO_ON = 4094,
    MODE_FULL_VIDEO_OFF = 4095;

export default DS.Model.extend({
  start: attr('number'),
  slide: attr('number'),
  site: attr(),

  urlFrag: null,
  externalUrlFrag: null,

  isSite: function() {
    var slide = this.get('slide');
    return slide === MODE_EXTERNAL_URL_ON || slide === MODE_EXTERNAL_URL_OFF;
  }.property('slide'),

  isVideo: function() {
    var slide = this.get('slide');
    return slide === MODE_FULL_VIDEO_ON || slide === MODE_FULL_VIDEO_OFF;
  }.property('slide'),

  isOn: function() {
    var slide = this.get('slide');
    return slide === MODE_FULL_VIDEO_ON || slide === MODE_EXTERNAL_URL_ON;
  }.property('slide'),

  isOnSite: function() {
    return this.get('isSite') && this.get('isOn');
  }.property('isSite', 'isOn'),

  isNotOnSite: function() {
    return !this.get('isOnSite');
  }.property('isOnSite'),

  encoded: function() {
    var encoded,
        slide = ('0' + base64(this.get('slide'))).slice(-2),
        start = ('00' + base64(this.get('start') * 10)).slice(-3);

    encoded = slide + start; // normal fragment always has 5 chars "0200Z"

    if (this.get('isOnSite')) {
      encoded = encoded + encodeURIComponent(this.get('site'));
    }

    return encoded;
  }.property('start', 'slide', 'site'),

  siteDidChange: function() {
    this.set('slide', MODE_EXTERNAL_URL_ON);
  }.observes('site'),

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
