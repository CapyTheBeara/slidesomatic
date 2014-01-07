export default function createModeFinder(type, callback) {
  return function() {
    var time = this.get('time'),

        seq = this.get('sequences').filter(function(seq) {
          if (seq.isPast(time, type)) { return true; }
        }).get('lastObject');
console.log(seq && seq.get('mode'), '===hit', time);
    if (seq && seq.get('isOn')) {
      this.set(type + 'Mode', true);
      if (callback) { callback(this, seq); }
    }
    else { this.set(type + 'Mode', false); }
  };
}
