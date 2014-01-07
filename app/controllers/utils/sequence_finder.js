function sequenceFinder(type, callback) {
  return function() {
    var seq = sequenceFinder.search(this, type);

    if (seq && seq.get('isOn')) {
      this.set(type + 'Mode', true);
      if (callback) { callback(this, seq); }
    }
    else { this.set(type + 'Mode', false); }
  };
}

sequenceFinder.search = function(self, type) {
  var time = self.get('time');

  return self.get('sequences').filter(function(seq) {
    if (seq.isPast(time, type)) { return true; }
  }).get('lastObject');
};

export default sequenceFinder;
