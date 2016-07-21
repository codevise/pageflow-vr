(function() {
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
    return '//storage.googleapis.com/vrview/index.html?video=//storage.googleapis.com/vrview/examples/video/congo_2048.mp4&is_stereo=true&image=examples/video/congo_2048.jpg';
  }

  pageflow.vr.VrView = pageflow.react.createPage(VrView);
}());
