export default {
  jumpTo: function(num) {
    this.set('slide', num);
  },

  next: function() {
    this.incrementProperty('slide');
  },

  previous: function() {
    if (this.get('slide') > 1) {
      this.decrementProperty('slide');
      return true;
    }
  }
};
