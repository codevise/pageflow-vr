(function() {
  const resolve = pageflow.react.resolve;

  function VrView(props) {
    return (
      <div className="pageflow_vr-vr_view">
        <iframe className="pageflow_vr-vr_view-frame"
                allowFullScreen
                frameBorder="0"
                src={source(props)}>
        </iframe>
      </div>
    );
  }

  function source(props) {
    return url({
      video: props.videoUrl || '//storage.googleapis.com/vrview/examples/video/congo_2048.mp4',
      is_stereo: props.isStereo ? 'true' : 'false',
      start_yaw: props.startYaw
    });
  }

  function url(params) {
    const paramsString = Object.keys(params).map((key) =>
      `${key}=${params[key]}`
    ).join('&');

    return `//storage.googleapis.com/vrview/index.html?${paramsString}`;
  }

  pageflow.vr.VrView = VrView;
}());
