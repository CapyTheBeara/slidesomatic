var isGdUrl = "http://is.gd/create.php?format=simple&url=TARGET_URL&format=json";

export default Ember.ArrayController.extend({
  presentation: null,
  itemController: 'sequence',
  sortProperties: ['start'],
  sortAscending: true,
  // currentSequence: null,
  activeTab: 'slides',
  editMode: true,
  showSeconds: true,
  needs: ['deck'],
  slide: Em.computed.alias('controllers.deck.slide'),
  shortUrl: null,

  actions: {
    changeTab: function(tab) {
      this.set('activeTab', tab);
    },

    shortenUrl: function() {
      if (confirm('Are you finished?\n(Shortened URLs should only be obtained once you have finished adding all of your slide sequences.)')) {
        var self = this,
            url = this.get('presentation.url'),
            opts = {
              url: isGdUrl.replace('TARGET_URL', encodeURIComponent(url)),
              dataType: 'jsonp'
            };

        $.ajax(opts).then(function(res) {
          self.set('shortUrl', res.shorturl);
        });
      }
    }

    // updateSequence: function(time) {
    //   var currentSequence = this.get('currentSequence'),

    //       hit = this.filter(function(seq) {
    //         if (seq.hasPassed(time)) { return true; }
    //       }).get('lastObject');

    //   if (!hit) { return false; }
    //   if (!currentSequence || !currentSequence.eq(hit)) {
    //     this.set('currentSequence', hit);
    //   }
    // }
  }
});
