import ResourceMixin from 'appkit/models/support/resource_model_mixin';

export default DS.Model.extend(ResourceMixin, {
  start: function() {
    return this.get('presentation.firstSequence.start');
  }.property('presentation.firstSequence.start')
});
