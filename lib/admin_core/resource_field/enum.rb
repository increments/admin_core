require_relative 'base'

module AdminCore
  module ResourceField
    # @!attribute [r] data
    #   @return [String]
    class Enum < Base
      private

      # @note Implementation for {QiitaAdmin::ResourceField::Base#field_value}
      def field_value
        {
          value: data,
          values: values,
        }
      end

      # @return [Array<String>]
      def values
        options.fetch(:values, [])
      end
    end

    AdminCore.register_resource_field(Enum)
  end
end
