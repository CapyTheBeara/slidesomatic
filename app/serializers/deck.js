export default DS.RESTSerializer.extend({
  jsonRoot: 'decks',

  extractSingle: function(store, type, _payload, id) {
    var payload = {};
    payload[this.get('jsonRoot')] = { id: id, queryResult: _payload };
    return this._super(store, type, payload);
  },

  extractArray: function(store, type, _payload) {
    var payload = {};
    payload[this.get('jsonRoot')] = [{ id: 'noop', queryResult: _payload }];
    return this._super(store, type, payload);
  }
});
