module Pageflow
  module Vr
    class Engine < Rails::Engine
      isolate_namespace Pageflow::Vr

      config.autoload_paths << File.join(config.root, 'lib')
      config.i18n.load_path += Dir[config.root.join('config', 'locales', '**', '*.yml').to_s]

      initializer "pageflow-vr.add_watchable_files", group: :all do |app|
        app.config.watchable_files.concat Dir["#{config.root}/app/assets/javascripts/**/*.jsx*"]
      end
    end
  end
end
