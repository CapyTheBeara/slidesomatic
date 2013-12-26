import Resolver from 'resolver';

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

var Playback = Ember.Object.extend({
  time: 0,
  slide: 1,
  mediaPlayer: null
});

Ember.Application.initializer({
  name: 'playbackInitializer',
  initialize: function(container, application) {
    container.register('playback:current', Playback);
    application.inject('component:popcorn-media', 'playback', 'playback:current');
    application.inject('component:popcorn-video', 'playback', 'playback:current');
    application.inject('component:slide-image', 'playback', 'playback:current');
    application.inject('controller:presentation', 'playback', 'playback:current');
    application.inject('controller:new', 'playback', 'playback:current');
    application.inject('controller:media', 'playback', 'playback:current');
  }
});

export default App;
