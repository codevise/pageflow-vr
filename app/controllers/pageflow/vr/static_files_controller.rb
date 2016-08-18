module Pageflow
  module Vr
    class StaticFilesController < ActionController::Base
      def vrview
        respond_to do |format|
          format.html
          format.css
          format.js
        end
      end
    end
  end
end
