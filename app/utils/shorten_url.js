// http://is.gd/2aGQdR

var isGdUrl = "http://is.gd/create.php?format=simple&url=TARGET_URL&format=json";

export default function(url) {
  var opts = {
        url: isGdUrl.replace('TARGET_URL', encodeURIComponent(url)),
        dataType: 'jsonp'
      };

  return $.ajax(opts).then(function(res) {
    var url = res.shorturl;
    return {
      url: url,
      path: url.split('.gd/')[1]
    };
  });
}
