module Pageflow
  module Vr
    class StaticFilesController < ActionController::Base
      after_action :allow_iframe, only: [:vrview, :vrview2]

      # By default Rails only allows XHR requests with js content type
      # (see docs of
      # `ActionController::RequestForgeryProtection`). This controller
      # serves static assets, though. Allow using its endpoint in
      # `<script>` tags.
      protect_from_forgery except: [:vrview, :vrview2]

      def vrview
        respond_to do |format|
          format.html
          format.css
          format.js
        end
      end

      def vrview2
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
