import YQLAdapterMixin from 'appkit/adapters/yql_adapter_mixin';

var gdataEndpoint = 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc';

export default DS.RESTAdapter.extend(
  YQLAdapterMixin, {

  findQuery: function(store, modelClass, params) {
    if (params.domainRoot === 'youtube') {
      return this.youtubeQuery(params.id);
    }

    return this._super(store, modelClass, params);
  },

  youtubeQuery: function(id) {
    var endpoint = gdataEndpoint.replace('VIDEO_ID', id);
    return $.getJSON(endpoint);
  },

  vimeoQuery: function() {
    return this.statusQuery();
  },

  soundcloudQuery: function() {
   return this.statusQuery();
  }
});
