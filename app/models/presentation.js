// http://localhost:8000/#/show?did=tboyt/presentation-27430110&vtype=yt&vid=bzT0ezT-Jn8&start=3676&seq=3676-1l3704.7-2l3714.2-3l3746.8-4l3778.6-5l3850.5-6l3865.3-7l3867-8l3899.6-7l3913.7-8l3924.5-9l3961.3-10l4018.1-11l4076.7-12l4127.2-13l4166.5-14l4394.5-15l4445.5-16

var DELIMITER = 'l';

export default DS.Model.extend({
  deck: DS.belongsTo('deck/deck'),
  video: DS.belongsTo('video/video'),
  sequences: DS.hasMany('sequence'),
  sequencesUrlFrag: null,

  path: function() {
    var host = "#/show?",
        did = 'did=' + this.get('deck.deckId'),
        dtype = '&dtype=' + this.get('deck.type'),
        vtype = '&vtype=' + this.get('video.type'),
        vid = "&vid=" + this.get('video.videoId'),
        seq = "&seq=" + this.get('encodedSequences'),
        url = [host, did, dtype, vtype, vid, seq].join('');

    return url;
  }.property('deck.url', 'video.url', 'encodedSequences'),

  url: function() {
    return window.location.host + "/" + this.get('path');
  }.property('path'),

  firstSequence: function() {
    return this.get('sequences').sortBy('start')[0];
  }.property('sequences.@each.start'),

  encodedSequences: function() {
    return this.get('sequences').mapBy('encoded').join(DELIMITER);
  }.property('sequences.@each.encoded'),

  createSequences: function() {
    var self = this,
        frag = this.get('sequencesUrlFrag'),

        seqs = frag.split(DELIMITER).map(function(item) {
          return self.store.createRecord('sequence', { urlFrag: item });
        });

    this.get('sequences').pushObjects(seqs);
  }.observes('sequencesUrlFrag')
});
