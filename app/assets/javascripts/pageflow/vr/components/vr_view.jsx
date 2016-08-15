(function() {
  class VrView extends React.Component {
    constructor(props, context) {
      super(props, context);

      this._autoplay = false;

      this.bindPlayer = iframe => {
        this.player = pageflow.vr.Player.create(iframe);
      };
    }

    componentWillReceiveProps(nextProps) {
      if (!this.props.pageState.isPrepared && nextProps.pageState.isPrepared) {
        this._autoplay = nextProps.isPlaying;
      }

      if (!this.player) {
        return;
      }

      if (!this.props.isPlaying && nextProps.isPlaying) {
        this.player.play();
      }
      else if (this.props.isPlaying && !nextProps.isPlaying) {
        this.player.fadeOutAndPause(200);
      }

      if (!this.props.isCardboardModeRequested && nextProps.isCardboardModeRequested) {
        this.player.enterVRMode();

        // Trigger reset of prop right away. This should listen for events emitted by the iframe instead.
        if (nextProps.onExitCardboardMode) {
          setTimeout(() => {
            nextProps.onExitCardboardMode();
          }, 100);
        }
      }
    }

    render() {
      return (
        <div className="pageflow_vr-vr_view">
          {this.renderIframeIfPrepared()}
        </div>
      );
    }

    renderIframeIfPrepared() {
      if (this.props.pageState.isPrepared && this.source()) {
        return this.renderIframe();
      }
    }

    renderIframe() {
      return (
        <iframe ref={this.bindPlayer}
                className="pageflow_vr-vr_view-frame"
                allowFullScreen
                frameBorder="0"
                src={this.source()}>
        </iframe>
      );
    }

    source() {
      const props = this.props;

      if (!props.videoFile || !props.videoFile[props.quality]) {
        return null;
      }

      return url({
        video: props.videoFile[props.quality],
        preview: props.videoFile.poster,
        is_stereo: props.isStereo ? 'true' : 'false',
        start_yaw: props.startYaw,
        no_autoplay: !this._autoplay
      });
    }
  }

  function url(params) {
    const paramsString = Object.keys(params).map((key) =>
      `${key}=${params[key]}`
    ).join('&');

    return `/vrview/index.html?${paramsString}`;
  }

  const {createContainer, withPageStateProp, resolve} = pageflow.react;

  pageflow.vr.VrView = createContainer(
    withPageStateProp(VrView),
    {
      fragments: {
        videoFile: resolve('videoFile', {
          property: 'videoId'
        })
      }
    }
  );
}());
