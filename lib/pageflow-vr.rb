require 'pageflow/vr/engine'

module Pageflow
  module Vr
    def self.plugin
      Vr::Plugin.new
    end

    def self.page_type
      Pageflow::React.create_page_type('vr', 'pageflow.vr.Page')
    end
  end
end
