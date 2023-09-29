module Pageflow
  module Vr
    class Engine < Rails::Engine
      isolate_namespace Pageflow::Vr

      if Rails.respond_to?(:autoloaders)
        lib = root.join('lib')

        config.autoload_paths << lib
        config.eager_load_paths << lib

        initializer 'pageflow_vr.autoloading' do
          Rails.autoloaders.main.ignore(
            lib.join('pageflow/vr/version.rb'),
            lib.join('generators')
          )
        end
      else
        config.autoload_paths << File.join(config.root, 'lib')
      end

      config.i18n.load_path += Dir[config.root.join('config', 'locales', '**', '*.yml').to_s]

      initializer "pageflow-vr.add_watchable_files", group: :all do |app|
        app.config.watchable_files.concat Dir["#{config.root}/app/assets/javascripts/**/*.jsx*"]
      end
    end
  end
end
