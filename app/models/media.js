import ResourceMixin from 'appkit/models/support/resource_model_mixin';
import timeFromUrl from 'appkit/utils/time_from_url';

export default DS.Model.extend(ResourceMixin, {
  start: function() {
    var presentationStart = this.get('presentation.firstSequence.start');
    if (presentationStart) { return presentationStart; }

    return timeFromUrl(this.get('url'));
  }.property('presentation.firstSequence.start', 'url')
});
