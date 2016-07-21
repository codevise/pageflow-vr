//= require_tree ./editor/
//= require_self

pageflow.vr = pageflow.vr || {};

pageflow.editor.pageTypes.register('vr', {
  configurationEditorView: pageflow.vr.ConfigurationEditorView,
});
