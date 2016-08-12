(function() {
  const {Icon} = pageflow.react.components;

  function NoVrView(props) {
    return (
      <div className="pageflow_vr-no_vr_view">
        <Icon name="pageflow-vr.play" />
        <p dangerouslySetInnerHTML={text(props)} />
        {renderYouTubeLink(props)}
      </div>
    );
  }

  function text(props) {
    return {__html: props.text || props.i18n.t('pageflow.public.vr.no_vr.text')};
  }

  function renderYouTubeLink(props) {
    if (props.youTubeUrl) {
      return (
        <a href={props.youTubeUrl} className="pageflow_vr-no_vr_view_link">
          {props.i18n.t('pageflow.public.vr.no_vr.link')}
        </a>
      );
    }
  }

  const {resolve} = pageflow.react;

  pageflow.vr.NoVrView = pageflow.react.createContainer(NoVrView, {
    fragments: {
      i18n: resolve('i18n')
    }
  });
}());
