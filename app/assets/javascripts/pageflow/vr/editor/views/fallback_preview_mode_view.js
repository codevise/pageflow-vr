pageflow.vr.FallbackPreviewModeView = Backbone.Marionette.View.extend({
  render: function() {
    return this;
  },

  onClose: function() {
    this.model.unset('preview_vr_fallback');
  }
});