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
        <VrView startYaw={props.page.startYaw} isStereo={props.page.isStereo} />
        <NoVrView>
          <PageBackgroundImage page={props.page} />
        </NoVrView>
      </PageWithInteractiveBackground>
    );
  }

  pageflow.vr.Page = pageflow.react.createPage(Page);
}());
