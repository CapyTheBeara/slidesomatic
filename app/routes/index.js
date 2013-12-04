// http://localhost:8000/#/?did=presentation-131021192733-phpapp02&vtype=yt&vid=bzT0ezT-Jn8&start=3676&seq=3676-1l3704.7-2l3714.2-3l3746.8-4l3778.6-5l3850.5-6l3865.3-7l3867-8l3899.6-7l3913.7-8l3924.5-9l3961.3-10l4018.1-11l4076.7-12l4127.2-13l4166.5-14l4394.5-15l4445.5-16

export default Ember.Route.extend({
  model: function(params, queryParams) {
    // start will always be in URL even if it's 0
    // TODO - get rid of start in the url. Instead determine from first sequence
    var start = queryParams.start, // can't be undefined when constructing model

        presentation = this.store.createRecord('presentation', {
          encodedSequencesUrlFrag: queryParams.seq
        }),

        deck = this.store.createRecord('deck', {
          deckId: queryParams.did
        }),

        video = this.store.createRecord(queryParams.vtype + '_video', {
          start: start,  // needs to be before videoId
          videoId: queryParams.vid
        });

    presentation.setProperties({ deck: deck, video: video });
    return presentation;
  }
});
