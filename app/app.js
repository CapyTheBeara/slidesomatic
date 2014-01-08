import Resolver from 'resolver';

Ember.FEATURES["query-params"] = true;

var App = Ember.Application.extend({
  LOG_ACTIVE_GENERATION: true,
  LOG_MODULE_RESOLVER: true,
  LOG_TRANSITIONS: true,
  LOG_TRANSITIONS_INTERNAL: true,
  LOG_VIEW_LOOKUPS: true,
  modulePrefix: 'appkit', // TODO: loaded via config
  Resolver: Resolver['default'],

  customEvents: {
    'input' : 'input'
  }
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
  presentationMode: true
});

Ember.Application.initializer({
  name: 'playbackInitializer',
  initialize: function(container, application) {
    container.register('playback:current', Playback);
    application.inject('controller', 'playback', 'playback:current');
  }
});

export default App;
