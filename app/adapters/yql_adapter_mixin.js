export default Ember.Mixin.create({
  findQuery: function(store, modelClass, params) {
    var yql = "http://query.yahooapis.com/v1/public/yql?q=",
        url = params.domain + params.id,  //= "https://speakerdeck.com/" + "jrallison/ember-components"
        domainRoot = params.domainRoot,
        query = this[domainRoot + 'Query'](),  //= "speakerdeckQuery"
        endpoint = yql + query.replace('URL', encodeURIComponent(url)) + '&format=json';

    return $.getJSON(endpoint);
  },

  xpathQuery: function(xpath) {
    var query = "select%20*%20from%20html%20where%20url%3D'URL'%20AND%20xpath%3D'XPATH'";
    return query.replace('XPATH', encodeURIComponent(xpath));
  },

  statusQuery: function() {
    return "select%20status%20from%20data.headers%20where%20url%3D%22URL%22&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  }
});
