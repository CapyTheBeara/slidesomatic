export default Ember.Component.extend({
  tagName: 'input',
  classNames: ['input-slider'],
  attributeBindings: ['type', 'min', 'max', 'value', 'step'],
  type: 'range',
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  magnitude: 1,

  // Chrome fires this when arrowing/sliding.
  // Firefox only fires this when releasing slider or
  // tabbing away
  change: function(evt) {
    this.input(evt);
  },

  // Chrome fires this when sliding (not arrowing).
  // Firefox fires this when arrowing/sliding.
  input: function(evt) {
    var value = this.get('value'),
        newValue = evt.target.value,
        change = newValue - value;

    if (change === 0) { return; }

    this.set('value', newValue);
    this.sendAction('action', this.get('magnitude') * change);
  }
});
