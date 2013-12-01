var endpoint = "http://static.slidesharecdn.com/swf/ssplayer2.swf";

export default Ember.Component.extend({
  elementId: "flashPlayer",
  deckId: null,

  didInsertElement: function() {
    var self = this,
        id = this.get('elementId'),
        params = { allowScriptAccess: "always" },
        atts = { id: "flashPlayer" },
        flashvars = { doc : this.get('deckId'), startSlide : 1, rel : 0 };

    swfobject.embedSWF(endpoint, "flashPlayer", "100%", "100%", "8", null, flashvars, params, atts, function() {
      self.sendAction('action', document.getElementById(id));
    });

  }
});
