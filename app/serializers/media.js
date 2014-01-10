import DeckSerializer from 'appkit/serializers/deck';

export default DeckSerializer.extend({
  jsonRoot: 'medias',

  extractArray: function(store, type, _payload) {
console.log(_payload, 'from media serializer=======');
    return this._super(store, type, _payload);
  }
});
