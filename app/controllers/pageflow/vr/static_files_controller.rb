module Pageflow
  module Vr
    class StaticFilesController < ActionController::Base
      after_action :allow_iframe, only: :vrview

      def vrview
        respond_to do |format|
          format.html
          format.css
          format.js
        end
      end

      private

      def allow_iframe
        response.headers.except! 'X-Frame-Options'
      end
    end
  end
end
