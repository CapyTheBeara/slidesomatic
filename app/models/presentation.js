var SITE_DELIMETER = '+';

export default DS.Model.extend({
  deck: DS.belongsTo('deck'),
  media: DS.belongsTo('media'),
  sequences: DS.hasMany('sequence'),

  sequencesUrlFrag: undefined,
  sitesFrag: undefined,

  path: function() {
    var deckId = this.get('deck.routeId'),
        mediaId = this.get('media.routeId'),
        encodedSequences = this.get('encodedSequences'),
        encodedSites = this.get('encodedSites'),

        route = "#/?",
        version = 'v=1',
        deck = deckId ? '&d=' + encodeURIComponent(deckId) : '',
        media = mediaId ? '&m=' + encodeURIComponent(mediaId) : '',
        seq = encodedSequences ? "&s=" + encodedSequences : '',
        sites = encodedSites ? "&u=" + encodedSites : '';

    return [route, version, deck, media, seq, sites].join('');
  }.property('deck.url', 'media.url', 'encodedSequences', 'encodedSites'),

  url: function() {
    return window.location.host + "/" + this.get('path');
  }.property('path'),

  firstSequence: function() {
    return this.get('sequences').sortBy('start')[0];
  }.property('sequences.@each.start'),

  encodedSequences: function() {
    return this.get('sequences')
               .filterBy('isNotSiteOn')
               .mapBy('encoded').join('');
  }.property('sequences.@each.encoded'),

  encodedSites: function() {
    return this.get('sequences')
               .filterBy('isSiteOn')
               .mapBy('encoded').join(SITE_DELIMETER);
  }.property('sequences.@each.isSiteOn'),

  sequencesUrlFragDidChange: function() {
    var self = this,
        frags = this.get('sequencesUrlFrag'),

        seqs = frags.match(/.{1,5}/g).map(function(frag) {
          return self.store.createRecord('sequence', { urlFrag: frag });
        });

    this.get('sequences').pushObjects(seqs);
  }.observes('sequencesUrlFrag'),

  sitesFragDidChange: function() {
    var frags = this.get('sitesFrag'),
        self = this,

        seqs = frags.split(SITE_DELIMETER).map(function(frag) {
          return self.store.createRecord('sequence', { siteFrag: frag });
        });

    this.get('sequences').pushObjects(seqs);
  }.observes('sitesFrag')
});
