var base64 = function(value) {
  if (typeof(value) === 'number') {
    if (isNaN(value)) { throw new Error("base64 doesn't accept NaN"); }
    return base64.getChars(value, '');
  }

  if (typeof(value) === 'string') {
    if (value === '') { return NaN; }
    return value.split('').reverse().reduce(function(prev, cur, i) {
      return prev + base64.chars.indexOf(cur) * Math.pow(64, i);
    }, 0);
  }
};

base64.chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_";

base64.getChars = function(num, res) {
  var mod = num % 64,
      remaining = Math.floor(num / 64),
      chars = base64.chars.charAt(mod) + res;

  if (remaining <= 0) { return chars; }
  return base64.getChars(remaining, chars);
};

export default base64;
