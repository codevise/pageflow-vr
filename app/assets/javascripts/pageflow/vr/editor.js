//= require_tree ./editor/
//= require_self

pageflow.vr = pageflow.vr || {};

pageflow.editor.pageTypes.register('vr', {
  configurationEditorView: pageflow.vr.ConfigurationEditorView,
});

_(['video_files', 'image_files']).each(function(collectionName) {
  pageflow.editor.fileTypes.modify(collectionName, {
    configurationEditorInputs: [
      {
        name: 'projection',
        inputView: pageflow.SelectInputView,
        inputViewOptions: {
          includeBlank: true,
          values: ['equirectangular_mono', 'equirectangular_stereo']
        }
      }
    ],

    confirmUploadTableColumns: [
      {
        name: 'projection',
        cellView: pageflow.EnumTableCellView
      }
    ],

    filters: [
      {
        name: 'with_projection',
        matches: function(file) {
          return !!file.configuration.get('projection');
        }
      }
    ]
  });
});
