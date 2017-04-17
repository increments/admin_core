require_relative 'base'

module AdminCore
  module ResourceField
    # @!attribute [r] data
    #   @return [String]
    class String < Base
      private

      # @note Implementation for {QiitaAdmin::ResourceField::Base#field_value}
      def field_value
        data
      end
    end

    AdminCore.register_resource_field(String)
  end
end
