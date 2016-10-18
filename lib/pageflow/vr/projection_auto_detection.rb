module Pageflow
  module Vr
    class ProjectionAutoDetection
      def call(options)
        file = options[:file]
        return unless file.is_a?(VideoFile)

        if dimension_present?(file) && auto_detection_enabled?(file)
          update(file)
        end
      end

      private

      def dimension_present?(video_file)
        video_file.width.present? && video_file.height.present?
      end

      def auto_detection_enabled?(video_file)
        video_file.configuration['projection'] == 'auto_detect'
      end

      def update(video_file)
        video_file.configuration =
          video_file.configuration.merge(projection: detect_projection(video_file))

        video_file.save!
      end

      def detect_projection(video_file)
        if video_file.width == video_file.height
          'equirectangular_stereo'
        elsif video_file.width == video_file.height * 2
          'equirectangular_mono'
        else
          ''
        end
      end
    end
  end
end
