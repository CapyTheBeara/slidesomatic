import YQLAdapterMixin from 'appkit/adapters/yql_adapter_mixin';

var gdataEndpoint = 'http://gdata.youtube.com/feeds/api/videos/VIDEO_ID?v=2&alt=jsonc';

export default DS.RESTAdapter.extend(
  YQLAdapterMixin, {

  endpoint: function() {
    var props = this.get('modelProperties');

    if (props.domainRoot === 'youtube') {
      return this.youtubeQuery(props.externalId);
    }

    return this._super();
  }.property('modelProperties'),

  youtubeQuery: function(id) {
    return gdataEndpoint.replace('VIDEO_ID', id);
  },

  vimeoQuery: function() {
    return this.statusQuery();
  },

  soundcloudQuery: function() {
   return this.statusQuery();
  }
});
