// example route ids:
// 0jrallison%2Fember-components
// 1tboyt%2Fpresentation-27430110
// 28MYcjaar7Vw
// 3armadamusic%2Farmin-van-buuren-shivers
// 476153146
// 51e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA
// 51JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI
// 6jonathangoldman%2Freducecomputed

import queryParams from 'appkit/utils/query_params';

var p1, p2, p3;

module("queryParams - converting from id:", {
  setup: function() {
    p1 = queryParams({ id: '0jrallison%2Fember-components' });
    p2 = queryParams({ id: '51e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA' });
    p3 = queryParams({ id: '28MYcjaar7Vw' });
  }
});

test('externalId is correct', function() {
  equal(p1.externalId, 'jrallison/ember-components');
  equal(p2.externalId, '1e0z1pT9JuEh8G5DOtib6XFDHK0GUFtrZrU3IfxJynaA');
  equal(p3.externalId, '8MYcjaar7Vw');
});

test('domain is correct', function() {
  equal(p1.domain, 'https://speakerdeck.com/');
  equal(p2.domain, 'https://docs.google.com/presentation/d/');
  equal(p3.domain, 'http://www.youtube.com/watch?v=');
});

test('domainRoot is correct', function() {
  equal(p1.domainRoot, 'speakerdeck');
  equal(p2.domainRoot, 'google');
  equal(p3.domainRoot, 'youtube');
});

test('url is correct', function() {
  equal(p1.url, 'https://speakerdeck.com/jrallison/ember-components');
  equal(p3.url, 'http://www.youtube.com/watch?v=8MYcjaar7Vw');
});

module("queryParams - converting from url:", {
  setup: function() {
    p1 = queryParams({
      url: 'http://slid.es/jonathangoldman/reducecomputed/'
    });

    p2 = queryParams({
      url: 'https://docs.google.com/presentation/d/1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI/edit?pli=1#slide=id.g177d510c8_0342'
    });

    p3 = queryParams({
      url: "http://www.youtube.com/watch?v=c-kav7Tf834&t=123"
    });
  }
});

test('externalId is correct', function() {
  equal(p1.externalId, 'jonathangoldman/reducecomputed');
  equal(p2.externalId, '1JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI');
  equal(p3.externalId, 'c-kav7Tf834');
});

test('domainRoot is correct', function() {
  equal(p1.domainRoot, 'slid');
  equal(p2.domainRoot, 'google');
  equal(p3.domainRoot, 'youtube');
});

test('domain is correct', function() {
  equal(p1.domain, 'http://slid.es/');
  equal(p2.domain, 'https://docs.google.com/presentation/d/');
  equal(p3.domain, 'http://www.youtube.com/watch?v=');
});

test('id is correct', function() {
  equal(p1.id, '6jonathangoldman%2Freducecomputed');
  equal(p2.id, '51JU1ToBg-K7_vLC5bt2gEcEy3p12mCQG8CGELOP3vWvI');
  equal(p3.id, '2c-kav7Tf834');
});

test('domainIndex is correct', function() {
  equal(p1.domainIndex, '6');
});


