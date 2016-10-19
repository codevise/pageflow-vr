//= require_tree ./editor/
//= require_self

pageflow.vr = pageflow.vr || {};

pageflow.editor.pageTypes.register('vr', {
  configurationEditorView: pageflow.vr.ConfigurationEditorView,
});

_(['video_files', 'image_files']).each(function(collectionName) {
  pageflow.editor.fileTypes.modify(collectionName, {
    configurationEditorInputs: function(model) {
      var values = ['equirectangular_mono', 'equirectangular_stereo'];
      var valuesWithAutoDetect = ['auto_detect'].concat(values);

      var options = {
        includeBlank: true,
        values: values
      };

      if (collectionName == 'video_files') {
        if (model.isNew()) {
          options = {
            includeBlank: true,
            ensureValueDefined: true,
            values: valuesWithAutoDetect
          };
        }
        else if (!model.isReady() && model.configuration.get('projection') == 'auto_detect') {
          options = {
            includeBlank: true,
            disabled: true,
            values: valuesWithAutoDetect
          };
        }
      }

      return [
        {
          name: 'projection',
          inputView: pageflow.SelectInputView,
          inputViewOptions: options
        }
      ];
    },

    configurationUpdaters: [
      function(configuration, newAttributes) {
        if (configuration.get('projection') == 'auto_detect' &&
            newAttributes.projection != 'auto_detect') {
          configuration.set('projection', newAttributes.projection);
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
          return !!file.configuration.get('projection') &&
            file.configuration.get('projection') != 'auto_detect';
        }
      }
    ]
  });
});
