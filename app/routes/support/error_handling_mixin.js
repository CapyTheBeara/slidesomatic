 /* jshint eqeqeq: false */

export default Ember.Mixin.create({
  handleErrors: function(model) {
    var error, results, status,
        res = model.get('queryResult');

    // check the response. gdata will reject the promise
    // and is handled in the error controller directly
    if (res.query) {  // yql query
      results = res.query.results;

      if (!results) {
        error = new Error('invalid yql query');

      } else if (results.resources) {
        status = results.resources.status;

        if (status && status != '200') {  // VALIDATE that large google presentations don't error
          error = new Error('not found');
        }
      }
    }

    if (error) {
      error.model = model;
      throw error;
    }
  },

  afterModel: function(model, transition) {
    this.handleErrors(model);
    this._super(model, transition);
  }
});
