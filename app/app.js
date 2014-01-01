import Resolver from 'resolver';
import Playback from 'appkit/utils/playback';

Ember.FEATURES["query-params"] = true;

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default']
});

Ember.RSVP.configure('onerror', function(error) {
  // ensure unhandled promises raise awareness.
  // may result in false negatives, but visibility is more important
  if (error instanceof Error) {
    Ember.Logger.assert(false, error);
    Ember.Logger.error(error.stack);
  }
});


Ember.Application.initializer({
  name: 'playbackInitializer',
  initialize: function(container, application) {
    container.register('playback:current', Playback);
    application.inject('component:soundcloud-audio', 'playback', 'playback:current');
    application.inject('component:youtube-video', 'playback', 'playback:current');
    application.inject('component:vimeo-video', 'playback', 'playback:current');
    application.inject('route', 'playback', 'playback:current');
    application.inject('controller:media', 'playback', 'playback:current');
    application.inject('controller:deck', 'playback', 'playback:current');
  }
});

export default App;
