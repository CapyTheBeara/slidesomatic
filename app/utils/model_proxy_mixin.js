var defineProperty = Ember.defineProperty;

var ModelProxy = Ember.ObjectProxy.extend({
  model: Em.computed.alias('content'),

  setUnknownProperty: function(key, value) {
    defineProperty(this, key, null, value);
    return value;
  },

  setKeys: function() {
    var keys = Em.keys(this),
        content = this.get('content');

    keys.forEach(function(key) {
      content.set(key, this.get(key));
    }, this);

    return this;
  },

  save: function() {
    this.setKeys();
    return this.get('content').save();
  }
});

export default Ember.Mixin.create({
  proxy: null,

  init: function() {
    this._super();
    this.set('proxy', ModelProxy.create({ model: this }));
  },

});
