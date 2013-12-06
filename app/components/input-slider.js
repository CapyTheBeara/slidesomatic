export default Ember.Component.extend({
  tagName: 'input',
  classNames: ['input-slider'],
  attributeBindings: ['type', 'min', 'max', 'value', 'step'],
  type: 'range',
  min: 0,
  max: 100,
  step: 1,
  value: 50,

  change: function(evt) {
    var value = this.get('value'),
        newValue = evt.target.value;

    this.set('value', newValue);
    this.sendAction('action', newValue - value);
  }
});
