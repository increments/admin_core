require_relative 'base'

module AdminCore
  module ResourceField
    # @!attribute [r] data
    #   @return [ActiveSupport::TimeWithZone]
    class Date < Base
      private

      # @note Implementation for {QiitaAdmin::ResourceField::Base#field_value}
      def field_value
        data.to_s
      end
    end

    AdminCore.register_resource_field(Date)
  end
end
