// https://speakerdeck.com/jrallison/ember-components

export default Ember.Mixin.create({
  speakerdeck: true,
  baseUrl: 'https://speakerdeck.com/',
  yql: "select%20*%20from%20html%20where%20url%3D'https%3A%2F%2Fspeakerdeck.com%2FDECK_ID'%20AND%20xpath%3D'%2F%2F*%5B%40id%3D%22share_pdf%22%5D'&format=json",
  validationRegex: /presentations\/(.*)\//,

  success: function(model) {
    return function(obj) {
      var href = obj.query.results && obj.query.results.a.href;
      model.set('validationResponse', href);
    };
  }
});
