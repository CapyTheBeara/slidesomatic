var endpoint = "http://static.slidesharecdn.com/swf/ssplayer2.swf";

// http://learnswfobject.com/advanced-topics/executing-javascript-when-the-swf-has-finished-loading/
function swfLoadEvent(fn, e){
  if (typeof fn !== "function") { return false; }

  var count = 0;

  var initialInteval = window.setInterval(function (){
    count++;

    if(count > 40 || typeof e.ref.PercentLoaded !== "undefined" && e.ref.PercentLoaded()){
      window.clearInterval(initialInteval);

      var _count = 0;
      var loadCheckInterval = window.setInterval(function (){
        _count++;
        if (_count > 5) { window.clearInterval(loadCheckInterval); }
        else if(e.ref.PercentLoaded() === 100){
          fn();
          window.clearInterval(loadCheckInterval);
        }
      }, 1500);
    }
  }, 100);
}

export default Ember.Component.extend({
  elementId: "deck-player",
  docId: null,

  didInsertElement: function() {
    var self = this,
        id = this.get('elementId'),
        params = { allowScriptAccess: "always", allowfullscreen: true },
        atts = { id: id },
        flashvars = { doc : this.get('docId'), startSlide : 1, rel : 0 };

    swfobject.embedSWF(endpoint, id, "100%", "100%", "8", null, flashvars, params, atts, function(e) {
      var view = document.getElementById(id);
      self.sendAction('sendSelf', view);

      swfLoadEvent(function() {
        view.next(); // get rid of bouncing arrow
        view.previous();
      }, e);
    });
  }
});