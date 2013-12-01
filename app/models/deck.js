// http://query.yahooapis.com/v1/public/yql?q=select%20thumbnail%20from%20json%20where%20url%3D%22http%3A%2F%2Fwww.slideshare.net%2Fapi%2Foembed%2F2%3Furl%3Dhttp%3A%2F%2Fwww.slideshare.net%2Ftboyt%2Fpresentation-27430110%26format%3Djson%22&format=json&diagnostics=true&callback=
// presentation-131021192733-phpapp02

var attr = DS.attr,
    SDUrl = "http://www.slideshare.net/DECK_ID";

export default DS.Model.extend({
  url: attr(),
  deckId: attr(),
  presentation: DS.belongsTo('presentation'),

});
