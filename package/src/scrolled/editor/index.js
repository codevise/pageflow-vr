import {editor} from 'pageflow-scrolled/editor';
import {FileInputView} from 'pageflow/editor';

editor.contentElementTypes.register('vrImage', {
  configurationEditor() {
    this.tab('general', function() {
      this.input('image', FileInputView, {
        collection: 'image_files',
        fileSelectionHandler: 'contentElementConfiguration'
      });
      this.group('ContentElementCaption');
      this.group('ContentElementPosition');
    });
  }
});
