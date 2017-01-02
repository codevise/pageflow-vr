require 'pageflow/vr/engine'

module Pageflow
  module Vr
    PAGE_TYPE_THUMBNAIL_CANDIDATES = [
      {
        attribute: 'thumbnail_image_id',
        file_collection: 'image_files'
      },
      {
        attribute: 'video_id',
        file_collection: 'video_files'
      }
    ]

    def self.plugin
      Vr::Plugin.new
    end

    def self.page_type
      Pageflow::React.create_page_type('vr',
                                       thumbnail_candidates: PAGE_TYPE_THUMBNAIL_CANDIDATES)
    end

    def self.routes(router)
      router.instance_eval do
        mount Pageflow::Vr::Engine, at: '/pageflow_vr'
      end
    end
  end
end
