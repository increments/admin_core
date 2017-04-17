require_relative 'base'

module AdminCore
  module ResourceField
    # @!attribute [r] data
    #   @return [Integer, Float]
    class Number < Base
      private

      # @note Implementation for {QiitaAdmin::ResourceField::Base#field_value}
      def field_value
        data
      end
    end

    AdminCore.register_resource_field(Number)
  end
end
