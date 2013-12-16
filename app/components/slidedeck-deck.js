var endpoint = "http://static.slidesharecdn.com/swf/ssplayer2.swf";

// http://learnswfobject.com/advanced-topics/executing-javascript-when-the-swf-has-finished-loading/
function swfLoadEvent(fn, e){
  if (typeof fn !== "function") { return false; }
  var initialTimeout = window.setTimeout(function (){
    if(typeof e.ref.PercentLoaded !== "undefined" && e.ref.PercentLoaded()){
      var loadCheckInterval = window.setInterval(function (){
        if(e.ref.PercentLoaded() === 100){
          fn();
          window.clearInterval(loadCheckInterval);
        }
      }, 1500);
    }
  }, 200);
}

export default Ember.Component.extend({
  elementId: "slide-player",
  docId: null,
  deckView: null,

  didInsertElement: function() {
    var self = this,
        id = this.get('elementId'),
        params = { allowScriptAccess: "always", allowfullscreen: true },
        atts = { id: id },
        flashvars = { doc : this.get('docId'), startSlide : 1, rel : 0 };

    swfobject.embedSWF(endpoint, id, "100%", "100%", "8", null, flashvars, params, atts, function(e) {
      swfLoadEvent(function() {
        var view = document.getElementById(id);
        view.next(); // get rid of bouncing arrow
        view.previous();
        self.set('deckView', view);
      }, e);
    });
  }
});
