export default DS.RESTSerializer.extend({
  jsonRoot: 'decks',

  extractArray: function(store, type, _payload) {
    var payload = {};
    payload[this.get('jsonRoot')] = [{ id: 'noop', queryResult: _payload }];
    return this._super(store, type, payload);
  }
});
