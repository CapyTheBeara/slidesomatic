import ResourceMixin from 'appkit/models/support/resource_model_mixin';

export default DS.Model.extend(ResourceMixin, {
  externalId: Em.computed.alias('id'),  // TODO refactor vimeo-video component to use id
  start: DS.attr()
});
