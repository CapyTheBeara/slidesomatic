var endpoint = "http://static.slidesharecdn.com/swf/ssplayer2.swf";

export default Ember.Component.extend({
  elementId: "flashPlayer",
  docId: null,

  didInsertElement: function() {
    var player,
        self = this,
        id = this.get('elementId'),
        params = { allowScriptAccess: "always", allowfullscreen: true },
        atts = { id: "flashPlayer" },
        flashvars = { doc : this.get('docId'), startSlide : 1, rel : 0 };

    swfobject.embedSWF(endpoint, "flashPlayer", "100%", "100%", "8", null, flashvars, params, atts, function() {
      player = document.getElementById(id);
      self.sendAction('action', player);
    });

  }
});
