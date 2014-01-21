import queryParams from 'appkit/utils/query_params';

export default Ember.Mixin.create({
  modelProperties: null,

  find: function(store, modelClass, id) {
    this.set('modelProperties', queryParams({ id: id }));
    return $.getJSON(this.get('endpoint'));
  },

  findQuery: function(store, modelClass, params) {
    this.set('modelProperties', queryParams(params));
    return $.getJSON(this.get('endpoint'));
  },

  endpoint: function() {
    var yql = "http://query.yahooapis.com/v1/public/yql?q=",
        props = this.get('modelProperties'),
        url = props.url,
        domainRoot = props.domainRoot,
        queryFunc = this[domainRoot + 'Query'];

    if (!queryFunc) { throw new Error('notSupported'); }

    var query = queryFunc.bind(this)();
    return yql + query.replace('URL', encodeURIComponent(url)) + '&format=json';
  }.property('modelProperties'),

  xpathQuery: function(xpath) {
    var query = "select%20*%20from%20html%20where%20url%3D'URL'%20AND%20xpath%3D'XPATH'";
    return query.replace('XPATH', encodeURIComponent(xpath));
  },

  statusQuery: function() {
    return "select%20status%20from%20data.headers%20where%20url%3D%22URL%22&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
  }
});
