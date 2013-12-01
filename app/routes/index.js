// http://localhost:8000/#/?did=presentation-131021192733-phpapp02&vtype=yt&vid=bzT0ezT-Jn8&start=3676&seq=3704.7,2|3714.2,3|3746.8,4|3778.6,5|3850.5,6|3865.3,7|3867,8|3899.6,7|3913.7,8|3924.5,9|3961.3,10|4018.1,11|4076.7,12|4127.2,13|4166.5,14|4394.5,15|4445.5,16
// start will always be in URL even if it's 0

export default Ember.Route.extend({
  model: function(params, queryParams) {
    var start = queryParams.start, // can't be undefined when constructing model

        presentation = this.store.createRecord('presentation'),

        sequences = createSequences(this.store, queryParams.seq, start),

        deck = this.store.createRecord('deck', {
          deckId: queryParams.did
        }),

        video = this.store.createRecord(queryParams.vtype + '_video', {
          start: start,  // needs to be before videoId
          videoId: queryParams.vid
        });

    presentation.setProperties({ deck: deck, video: video });
    presentation.get('sequences').pushObjects(sequences);
    return presentation;
  }
});

function createSequences(store, urlFrag, start) {
  var split = urlFrag.split('|');

  split.unshift(start + ',1');

  return split.map(function(item, i, arr) {
    var stop,
        current = item.split(',');

    if (i < arr.length - 1) {
      stop = arr[i+1].split(',')[0];
    } else {
      stop = Infinity;
    }

    return store.createRecord('sequence', {
      start: current[0],
      stop: stop,
      slide: current[1]
    });
  });
}
