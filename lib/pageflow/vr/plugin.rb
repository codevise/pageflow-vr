module Pageflow
  module Vr
    class Plugin < Pageflow::Plugin
      def configure(config)
        config.features.register(PageTypeFeature.new(Vr.page_type))
        config.hooks.on(:file_encoded, ProjectionAutoDetection.new)
      end
    end
  end
end
