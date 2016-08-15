pageflow.vr.Player = pageflow.Object.extend({
  initialize: function(iframe) {
    this.iframe = iframe;
    this.cachedVolume = 1;
    this.cachedPaused = iframe.src.indexOf('no_autoplay=true') >= 0;
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
  }
});

pageflow.vr.Player.create = function(iframe) {
  if (!iframe) {
    return null;
  }

  var player = new pageflow.vr.Player(iframe);

  pageflow.mediaPlayer.enhance(player, {
    volumeFading: true
  });

  return player;
};