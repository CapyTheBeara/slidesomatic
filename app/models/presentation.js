var SITE_DELIMETER = '+';

export default DS.Model.extend({
  shortUrl: DS.attr(),
  deck: DS.belongsTo('deck'),
  media: DS.belongsTo('media'),
  sequences: DS.hasMany('sequence'),

  sequencesHash: null,
  sitesHash: null,

  path: function() {
    var deckId = this.get('deck.id'),
        mediaId = this.get('media.id'),
        sequencesPath = this.get('sequencesPath'),
        deck = deckId ? '/' + deckId : '',
        media = mediaId ? '/' + mediaId : '',
        seq = sequencesPath ? '/' + sequencesPath : '';

    return ['#/view', deck, media, seq].join('');
  }.property('deck.id', 'media.id', 'sequencesPath'),

  url: function() {
    var location = window.location;
    return [location.protocol + '/', location.host, 'b', this.get('path')].join('/');
  }.property('path'),

  sequencesPath: function() {
    var sites = this.get('encodedSites'),
        path = this.get('encodedSequences');

    if (sites) { path = path + '?s=' + sites; }
    return path;
  }.property('encodedSequences', 'encodedSites'),

  encodedSequences: function() {
    return this.get('sequences')
               .filterBy('isNotSiteOn')
               .mapBy('encoded').join('');
  }.property('sequences.@each.encoded'),

  encodedSites: function() {
    return this.get('sequences')
               .filterBy('isSiteOn')
               .mapBy('encoded').join(SITE_DELIMETER);
  }.property('sequences.@each.encoded'),

  firstSequence: function() {
    return this.get('sequences').sortBy('start')[0];
  }.property('sequences.@each.start'),

  sequencesHashDidChange: function() {
    var self = this,
        hash = this.get('sequencesHash'),

        seqs = hash.match(/.{1,5}/g).map(function(part) {
          return self.store.createRecord('sequence', { hash: part });
        });

    this.get('sequences').pushObjects(seqs);
  }.observes('sequencesHash'),

  sitesHashDidChange: function() {
    var hash = this.get('sitesHash'),
        self = this,

        seqs = hash.split(SITE_DELIMETER).map(function(part) {
          return self.store.createRecord('sequence', { siteHash: part });
        });

    this.get('sequences').pushObjects(seqs);
  }.observes('sitesHash')
});
