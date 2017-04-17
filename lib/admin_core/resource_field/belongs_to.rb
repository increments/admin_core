require_relative 'base'
require_relative '../errors'

module AdminCore
  module ResourceField
    class BelongsTo < Base
      private

      def field_value
        {
          # Remove fields to avoid infinite field dependency loop
          resource: associated_resource_manager.convert_for_index_page(associated_resource).merge(fields: []),
        }
      end

      def validate
        return if associated_resource_manager_class
        raise AdminCore::InvalidResourceFieldDefinition, 'resource_manager_class option is required'
      end

      def associated_resource
        data || associated_resource_manager.build({})
      end

      def associated_resource_manager
        @associated_resource_manager ||= associated_resource_manager_class.new
      end

      def associated_resource_manager_class
        options[:resource_manager_class] || AdminCore.resource_managers.find do |manager_class|
          manager_class.resource_name.to_sym == name
        end
      end
    end

    AdminCore.register_resource_field(BelongsTo)
  end
end
