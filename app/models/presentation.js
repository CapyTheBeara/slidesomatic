export default DS.Model.extend({
  deck: DS.belongsTo('deck'),
  media: DS.belongsTo('media'),
  sequences: DS.hasMany('sequence'),
  sequencesUrlFrag: undefined,

  path: function() {
    var deckId = this.get('deck.routeId'),
        mediaId = this.get('media.routeId'),
        encodedSequences = this.get('encodedSequences'),
        route = "#/?",
        version = 'v=1',
        deck = deckId ? '&d=' + encodeURIComponent(deckId) : '',
        media = mediaId ? '&m=' + encodeURIComponent(mediaId) : '',
        seq = encodedSequences ? "&s=" + encodedSequences : '';

    return [route, version, deck, media, seq].join('');
  }.property('deck.url', 'media.url', 'encodedSequences'),

  url: function() {
    return window.location.host + "/" + this.get('path');
  }.property('path'),

  firstSequence: function() {
    return this.get('sequences').sortBy('start')[0];
  }.property('sequences.@each.start'),

  encodedSequences: function() {
    return this.get('sequences').mapBy('encoded').join('');
  }.property('sequences.@each.encoded'),

  sequencesUrlFragDidChange: function() {
    var self = this,
        frags = this.get('sequencesUrlFrag'),

        seqs = frags.match(/.{1,5}/g).map(function(frag) {
          return self.store.createRecord('sequence', { urlFrag: frag });
        });

    this.get('sequences').pushObjects(seqs);
  }.observes('sequencesUrlFrag')
});
