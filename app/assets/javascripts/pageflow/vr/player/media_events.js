pageflow.vr.Player.mediaEvents = function(player, context) {
  function triggerMediaEvent(name, event) {
    pageflow.events.trigger('media:' + name, {
      fileName: event.currentSrc,
      context: context,
      currentTime: event.currentTime,
      duration: event.duration,
      volume: player.volume(),
      bitrate: getBitrate(event.currentSrc)
    });
  }

  player.on('play', function(event) {
    triggerMediaEvent('play', event);
  });

  player.on('timeupdate', function(event) {
    triggerMediaEvent('timeupdate', event);
  });

  player.on('pause', function(event) {
    triggerMediaEvent('pause', event);
  });

  function getBitrate(src) {
    if (src.match(/4k/)) {
      return 22000000;
    }
    else if (src.match(/fullhd/)) {
      return 6000000;
    }
    else {
      return 3500000;
    }
  }
};