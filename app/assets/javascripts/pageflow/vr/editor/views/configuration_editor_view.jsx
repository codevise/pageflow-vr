pageflow.vr.ConfigurationEditorView = pageflow.ConfigurationEditorView.extend({
  configure: function() {
    this.tab('general', function() {
      this.group('general');

      this.input('control_bar_text', pageflow.TextInputView, {
        placeholder: I18n.t('pageflow.public.before_after.start', {
          locale: pageflow.entry.configuration.get('locale')
        })
      });
    });

    this.tab('files', function() {
      this.input('background_image_id', pageflow.FileInputView, {
        collection: 'image_files'
      });
      this.input('thumbnail_image_id', pageflow.FileInputView, {
        collection: 'image_files',
        positioning: false
      });
    });

    this.tab('options', function() {
      this.group('options');
    });
  }
});
