function sequenceFinder(type, callback) {
  return function() {
    var seq = sequenceFinder.search(this, type),
        mode = type + 'Mode';

    if (seq && seq.get('isOn')) {

      if (callback) {
        if (callback(this, seq)) { this.set(mode, true); }
      }
      else { this.set(mode, true); }
    }
    else { this.set(mode, false); }
  };
}

sequenceFinder.search = function(self, type) {
  var time = self.get('time');

  return self.get('sequences').filter(function(seq) {
    if (seq.isPast(time, type)) { return true; }
  }).get('lastObject');
};

export default sequenceFinder;
