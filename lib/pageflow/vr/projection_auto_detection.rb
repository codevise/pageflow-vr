module Pageflow
  module Vr
    class ProjectionAutoDetection
      def call(options)
        file = options[:file]
        return unless file.is_a?(VideoFile) && file.usages.any?

        usage = file.usages.first

        if dimension_present?(file) && auto_detection_enabled?(usage)
          update(usage, file)
        end
      end

      private

      def dimension_present?(video_file)
        video_file.width.present? && video_file.height.present?
      end

      def auto_detection_enabled?(file_usage)
        file_usage.configuration['projection'] == 'auto_detect'
      end

      def update(usage, video_file)
        usage.configuration =
          usage.configuration.merge(projection: detect_projection(video_file))

        usage.save!
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
