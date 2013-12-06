// http://is.gd/r0DMQy

var isGdUrl = "http://is.gd/create.php?format=simple&url=TARGET_URL&format=json";

export default Ember.ArrayController.extend({
  presentation: null,
  editMode: false,
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  url: Em.computed.alias('presentation.url'),
  showUrl: Em.computed.and('editMode', 'presentation.firstSequence'),
  shortUrl: null,
  showSeconds: true,

  actions: {
    shortenUrl: function() {
      if (confirm('Are you finished?\n(Shortened URLs should only be obtained once you have finished adding all of your slide sequences.)')) {
        var self = this,
            url = this.get('url'),
            opts = {
              url: isGdUrl.replace('TARGET_URL', encodeURIComponent(url)),
              dataType: 'jsonp'
            };

        $.ajax(opts).then(function(res) {
          self.set('shortUrl', res.shorturl);
        });
      }
    }
  }
});
