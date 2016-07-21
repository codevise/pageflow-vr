module Pageflow
  module Vr
    class Plugin < Pageflow::Plugin
      def configure(config)
        config.features.register(PageTypeFeature.new(Vr.page_type))
      end
    end
  end
end
