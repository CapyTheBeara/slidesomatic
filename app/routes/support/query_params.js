// example route ids:
// 0jrallison%2Fember-components
// 1tboyt%2Fpresentation-27430110
// 28MYcjaar7Vw
// 3armadamusic%2Farmin-van-buuren-shivers
// 476153146
// 51e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA
// 51JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI
// 6jonathangoldman%2Freducecomputed

var domains = [
      'https://speakerdeck.com/',                // 0
      'http://www.slideshare.net/',              // 1
      'http://www.youtube.com/watch?v=',         // 2
      'https://soundcloud.com/',                 // 3
      'https://vimeo.com/',                      // 4
      'https://docs.google.com/presentation/d/', // 5
      'http://slid.es/'                          // 6
    ];

var urlRegex = /^http(?:s?):\/\/(?:w*\.?)(.+)\.(?:com|net|es)/;

export default Ember.Object.extend({
  routeId: null,  // 1tboyt%2Fpresentation-27430110

  id: function() {
    return decodeURIComponent(this.get('routeId').slice(1));
  }.property('routeId'),

  domain: function() {
    return domains[this.get('routeId').charAt(0)];
  }.property('routeId'),

  domainRoot: function() {
    var domain = this.get('domain');
    if (!domain) { return; }

    var split = domain.match(urlRegex)[1].split('.');
    return split[split.length - 1];  // meh
  }.property('domain'),

  modelProperties: function() {
    return {
      id: this.get('id'),
      domain: this.get('domain'),
      domainRoot: this.get('domainRoot')
    };
  }.property('routeId, domain')
});
