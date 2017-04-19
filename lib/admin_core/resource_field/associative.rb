require_relative 'base'

module AdminCore
  module ResourceField
    # @abstract
    class Associative < Base
      private

      def validate
        return if associated_resource_manager_class
        raise AdminCore::InvalidResourceFieldDefinition,
              'Resource manager could not be detected. Use :resource_manager_class option'
      end

      # @return [AdminCore::BaseResourceManager]
      def associated_resource_manager
        @associated_resource_manager ||= associated_resource_manager_class.new
      end

      # @return [Class]
      def associated_resource_manager_class
        options[:resource_manager_class] || AdminCore.resource_managers.find do |manager_class|
          manager_class.resource_name == name.to_s.singularize
        end
      end
    end
  end
end
