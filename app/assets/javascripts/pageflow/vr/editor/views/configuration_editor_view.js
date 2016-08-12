pageflow.vr.ConfigurationEditorView = pageflow.ConfigurationEditorView.extend({
  configure: function() {
    this.tab('general', function() {
      this.group('general');

      this.input('additional_title', pageflow.TextInputView);
      this.input('additional_description', pageflow.TextAreaInputView, {size: 'short'});

      this.input('control_bar_text', pageflow.TextInputView, {
        placeholder: I18n.t('pageflow.public.vr.start', {
          locale: pageflow.entry.configuration.get('locale')
        })
      });
    });

    this.tab('files', function() {
      this.input('video_id', pageflow.FileInputView, {
        collection: 'video_files',
        positioning: false
      });
      this.input('autoplay', pageflow.CheckBoxInputView);
      this.input('is_stereo', pageflow.CheckBoxInputView);
      this.input('start_yaw', pageflow.SliderInputView, {
        unit: '°',
        maxValue: 360
      });
      this.input('thumbnail_image_id', pageflow.FileInputView, {
        collection: 'image_files',
        positioning: false
      });
    });

    this.tab('vr_fallback', function() {
      this.input('preview_vr_fallback', pageflow.CheckBoxInputView);
      this.input('fallback_image_id', pageflow.FileInputView, {
        collection: 'image_files'
      });
      this.input('fallback_text', pageflow.TextAreaInputView, {
        size: 'short'
      });
      this.input('fallback_you_tube_url', pageflow.UrlInputView, {
        permitHttps: true,
        displayPropertyName: 'display_fallback_you_tube_url',
        supportedHosts: [
          'http://youtube.com',
          'https://youtube.com'
        ]
      });
      this.view(pageflow.vr.FallbackPreviewModeView, {
        model: this.model
      });
    });

    this.tab('options', function() {
      this.group('options');
    });
  }
});
