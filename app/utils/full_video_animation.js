export default Ember.Object.extend({
  selector: null,

  selectorDidChange: function() {
      var el = $(this.get('selector')),
          body = $('body');

      this.set('el', el);
      this.set('oldH', el.height());
      this.set('oldW', el.width());
      this.set('offset', el.offset());

      this.set('bodyW', body.innerWidth());
      this.set('bodyH', body.innerHeight());
  }.observes('selector').on('init'),

  expand: function() {
    var el = this.get('el');

    el.animate({
      left: '-' + this.get('offset').left,
      width: this.get('bodyW'),
      height: this.get('bodyH')
    }, 1000, function() {
      el.css({
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      });
    });
  },

  contract: function() {
    var el = this.get('el');

    el.css({
      position: 'relative',
      left: '-' + this.get('offset').left + 'px',
      width: this.get('bodyW'),
      height: this.get('bodyH')
    });

    el.animate({
      left: '0px',
      height: this.get('oldH') + 'px',
      width: this.get('oldW') + 'px'
    }, 1000, function() {
      el.css('width', '');
    });
  }
});
