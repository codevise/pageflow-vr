//= require_self
//= require ./player/media_events

pageflow.vr.Player = pageflow.Object.extend({
  initialize: function(iframe) {
    this.iframe = iframe;
    this.cachedVolume = 1;
    this.cachedPaused = iframe.src.indexOf('no_autoplay=true') >= 0;
    this.id = getIdParam(iframe.src);

    this.messageListener = this.onMessage.bind(this);

    if (this.id) {
      window.addEventListener('message', this.messageListener);
    }
  },

  dispose: function() {
    this.off(null, null, null);
    window.removeEventListener('message', this.messageListener);
  },

  play: function() {
    this.cachedPaused = false;
    this.sendCommand('play');
  },

  pause: function() {
    this.cachedPaused = true;
    this.sendCommand('pause');
  },

  paused: function() {
    return this.cachedPaused;
  },

  volume: function(value) {
    if (typeof value === 'undefined') {
      return this.cachedVolume;
    }
    else {
      this.cachedVolume = value;
      this.sendCommand('volume', Math.max(0, Math.min(1, value)));
    }
  },

  enterVRMode: function() {
    this.sendCommand('enterVRMode');
  },

  sendCommand: function(name, value) {
    this.iframe.contentWindow.postMessage({
      type: 'PlayerCommand',
      command: name,
      value: value
    }, '*');
  },

  onMessage: function(event) {
    var message = event.data;

    if (message.type == 'VrViewEvent' &&
        message.vrViewId == this.id) {

      this.trigger(message.event, message.eventData);
    }
  },

  one: function() {
    this.once.apply(this, arguments);
  }
});

function getIdParam(url) {
  var result = url.match(/id=(\d+)/);
  return result && result[1];
}

pageflow.vr.Player.create = function(iframe, options) {
  if (!iframe) {
    return null;
  }

  var player = new pageflow.vr.Player(iframe);

  pageflow.mediaPlayer.enhance(player, {
    volumeFading: true
  });

  pageflow.vr.Player.mediaEvents(player, options.context);

  return player;
};
