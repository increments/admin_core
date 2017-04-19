require_relative 'associative'

module AdminCore
  module ResourceField
    class HasMany < Associative
      private

      def field_value
        {
          attributes: attributes,
          resources: associated_resources.map do |resource|
            associated_resource_manager.convert_for_index_page(resource)
          end
        }
      end

      def attributes
        associated_resource_manager.human_attribute_names_for_index
      end

      def associated_resources
        data
      end
    end

    AdminCore.register_resource_field(HasMany)
  end
end
