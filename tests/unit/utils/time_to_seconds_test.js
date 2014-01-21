import t from 'appkit/utils/time_from_url';

module("timeFromUrl");

test('converts to seconds correctly', function() {
  equal(t('http://www.youtube.com/wa2stch?v=bzT0ezT-Jn8#t=6s'), 6);
  equal(t('http://www.youtube.com/wat1mch?v=bzT0ezT-Jn8#t=3m6s&a=a'), 186);
  equal(t('http://www.youtube.com/watch?v=bzT0e9h-Jn8#t=1h1m6s/foo'), 3666);
});
