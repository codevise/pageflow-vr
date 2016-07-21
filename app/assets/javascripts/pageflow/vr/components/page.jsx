(function() {
  const {
    PageWithInteractiveBackground, PageBackgroundImage
  } = pageflow.react.components;

  const {
    VrView, NoVrView
  } = pageflow.vr;

  function Page(props) {
    return (
      <PageWithInteractiveBackground page={props.page}>
        <VrView />
        <NoVrView>
          <PageBackgroundImage page={props.page} />
        </NoVrView>
      </PageWithInteractiveBackground>
    );
  }

  pageflow.vr.Page = pageflow.react.createPage(Page);
}());
