/* jshint eqeqeq: false */

import yqlValidator from 'appkit/models/validators/yql';

export default yqlValidator.extend({
  yql: "SELECT%20status%20FROM%20data.headers%20WHERE%20url%3D%22https%3A%2F%2Fsoundcloud.com%2FEXTERNAL_ID%22&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",

  success: function(self) {
    return function(obj) {
      var statusCode = obj.query.results && obj.query.results.resources.status;
      self.set('response', statusCode == 200);
    };
  }
});

