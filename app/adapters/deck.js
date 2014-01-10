import YQLAdapterMixin from 'appkit/adapters/yql_adapter_mixin';

export default DS.Adapter.extend(
  YQLAdapterMixin, {

  speakerdeckQuery: function() {
    return this.xpathQuery('//*[@id="share_pdf"]');
  },

  slideshareQuery: function() {
    return this.xpathQuery('//*[@id="svPlayerId"]/div[1]/div/div[1]/img');
  },

  googleQuery: function() {
    return this.statusQuery();
  },

  slidQuery: function() {
   return this.statusQuery();
  }
});
