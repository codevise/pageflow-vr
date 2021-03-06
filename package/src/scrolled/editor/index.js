import {editor} from 'pageflow-scrolled/editor';
import {FileInputView, EnumTableCellView} from 'pageflow/editor';

editor.contentElementTypes.register('vrImage', {
  configurationEditor() {
    this.tab('general', function() {
      this.input('image', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration',
        filter: 'with_projection',
        positioning: false
      });
      this.group('ContentElementCaption');
      this.group('ContentElementPosition');
    });
  }
});

editor.fileTypes.modify('image_files', {
  configurationEditorInputs(model) {
    var values = ['equirectangular_mono', 'equirectangular_stereo'];

    return [
      {
        name: 'projection',
        inputView: pageflow.SelectInputView,
        inputViewOptions: {
          includeBlank: true,
          values: values
        }
      }
    ];
  },

  confirmUploadTableColumns: [
    {
      name: 'projection',
      cellView: EnumTableCellView
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
