pageflow.vr.ConfigurationEditorView = pageflow.ConfigurationEditorView.extend({
  configure: function() {
    this.tab('general', function() {
      this.group('general');

      this.input('control_bar_text', pageflow.TextInputView, {
        placeholder: I18n.t('pageflow.public.vr.start', {
          locale: pageflow.entry.configuration.get('locale')
        })
      });
    });

    this.tab('files', function() {
      this.input('video_id', pageflow.FileInputView, {
        collection: 'video_files'
      });
      this.input('is_stereo', pageflow.CheckBoxInputView);
      this.input('start_yaw', pageflow.SliderInputView, {
        unit: '°',
        maxValue: 360
      });
      this.input('fallback_type', pageflow.SelectInputView, {
        values: ['youtube', 'image'],
        ensureValueDefined: true
      });
      this.input('fallback_youtube_url', pageflow.UrlInputView, {
        permitHttps: true,
        visibleBinding: 'fallback_type',
        visibleBindingValue: 'youtube'
      });
      this.input('fallback_image_id', pageflow.FileInputView, {
        collection: 'image_files',
        visibleBinding: 'fallback_type',
        visibleBindingValue: 'image'
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
