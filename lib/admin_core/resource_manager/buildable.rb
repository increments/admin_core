module AdminCore
  module ResourceManager
    module Buildable
      extend ActiveSupport::Concern

      # @!method self.resource_class
      #   @return [Class]
      # @!method self.resource_name
      #   @return [String]
      # @!method self.resource_display_name
      #   @return [String]
      class_methods do
        def resource_class
          @model ||= "::#{name.demodulize}".constantize
        end

        def resource_name
          resource_class.model_name.singular
        end

        def resource_display_name
          resource_class.model_name.human
        end

        private

        attr_writer :model
      end

      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def build(params)
        self.class.resource_class.new(params)
      end

      # @return [String]
      def name
        self.class.resource_class.model_name.singular
      end
    end
  end
end
