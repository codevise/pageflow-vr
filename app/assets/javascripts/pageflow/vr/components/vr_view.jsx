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
          <iframe ref={this.bindPlayer}
                  className="pageflow_vr-vr_view-frame"
                  allowFullScreen
                  frameBorder="0"
                  src={source(this.props)}>
          </iframe>
        </div>
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
      video: props.videoUrl || '//storage.googleapis.com/vrview/examples/video/congo_2048.mp4',
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

  pageflow.vr.VrView = pageflow.react.createContainer(
    pageflow.react.createPageComponent(VrView),
    {
      fragments: {
        videoUrl: resolve('videoFileUrl', {
          id: props => props.videoId,
          quality: '4k'
        })
      }
    }
  );
}());
