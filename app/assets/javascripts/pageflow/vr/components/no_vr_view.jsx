(function() {
  function NoVrView(props) {
    return (
      <noscript />
    );
  }

  pageflow.vr.NoVrView = pageflow.react.createPage(NoVrView);
}());
