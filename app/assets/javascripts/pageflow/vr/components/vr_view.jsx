(function() {
  const resolve = pageflow.react.resolve;

  class VrView extends React.Component {
    constructor(props, context) {
      super(props, context);

      this.bindPlayer = iframe => {
        this.player = pageflow.ppp = pageflow.vr.Player.create(iframe);
      };
    }

    render() {
      return (
        <div className="pageflow_vr-vr_view">
          {this.renderIframeIfPrepared()}
        </div>
      );
    }

    renderIframeIfPrepared() {
      if (this.props.prepared) {
        return this.renderIframe();
      }
    }

    renderIframe() {
      return (
        <iframe ref={this.bindPlayer}
                className="pageflow_vr-vr_view-frame"
                allowFullScreen
                frameBorder="0"
                src={source(this.props)}>
        </iframe>
      );
    }

    pageWillActivate() {
      this.player.playAndFadeIn(1000);
    }

    pageWillDeactivate() {
      this.player.fadeOutAndPause(1000);
    }
  }

  function source(props) {
    return url({
      video: props.videoFile[props.quality],
      is_stereo: props.isStereo ? 'true' : 'false',
      start_yaw: props.startYaw,
      no_autoplay: true
    });
  }

  function url(params) {
    const paramsString = Object.keys(params).map((key) =>
      `${key}=${params[key]}`
    ).join('&');

    return `/vrview/index.html?${paramsString}`;
  }

  const {withPageLifecycle, withPreparationProps} = pageflow.react;

  pageflow.vr.VrView = pageflow.react.createContainer(
    withPageLifecycle(withPreparationProps(VrView)),
    {
      fragments: {
        videoFile: resolve('videoFile', {
          id: props => props.videoId
        })
      }
    }
  );
}());
