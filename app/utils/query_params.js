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

var alias = Em.computed.alias,
    urlRegex = /^http(?:s?):\/\/(?:w*\.?)(?:(?:.+)\.)?(.+)\.(?:com|net|es)(?:\/(.+)$)?/;

var QueryParams = Ember.Object.extend({
  externalId: null,
  domainIndex: null,
  deck_id: alias('id'),
  media_id: alias('id'),

  id: function(k, v) {
    if (v) {
      this.setProperties({
        domainIndex: v.charAt(0),
        externalId: decodeURIComponent(v.slice(1))
      });
      return v;
    }

    return this.get('domainIndex') + encodeURIComponent(this.get('externalId'));
  }.property('domainIndex', 'externalId'),

  domain: function() {
    return domains[this.get('domainIndex')];
  }.property('domainIndex'),

  domainRoot: function() {
    var domain = this.get('domain');
    if (!domain) { return; }
    return domain.split(/\.(com|es|net)/)[0]
                 .match(/([^\.|\/]+)$/)[0];
  }.property('domain'),

  url: function(k, url) {
    if (!url) {
      return this.get('domain') + this.get('externalId');
    }

    var match = url.match(urlRegex),
        externalId = match[2],
        domainRoot = match[1],
        domain = domains.find(function(d) {
          return d.match(domainRoot + '\\.');
        }),
        domainIndex = domains.indexOf(domain);

    if (domainRoot === 'google') {
      externalId = externalId.match(/presentation\/.\/([^\/]+)/)[1];
    }

    if (domainRoot === 'youtube') {
      externalId = externalId.replace('watch?v=', '').split('&')[0];
    }

    this.setProperties({
      externalId: externalId.replace(/\/$/, ''),
      domainIndex: domainIndex
    });

    return url;
  }.property('url'),

  getModelProperties: function() {
    return this.getProperties([
      'id',
      'externalId',
      'domain',
      'domainIndex',
      'domainRoot',
      'url'
    ]);
  }
});

export default function queryParams(obj) {
  return QueryParams.create(obj).getModelProperties();
}
