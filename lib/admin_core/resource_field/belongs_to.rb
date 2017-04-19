require_relative 'associative'
require_relative '../errors'

module AdminCore
  module ResourceField
    class BelongsTo < Associative
      private

      def field_value
        {
          # Remove fields to avoid infinite field dependency loop
          resource: associated_resource_manager.convert_for_index_page(associated_resource).merge(fields: []),
        }
      end

      def associated_resource
        data || associated_resource_manager.build({})
      end
    end

    AdminCore.register_resource_field(BelongsTo)
  end
end
