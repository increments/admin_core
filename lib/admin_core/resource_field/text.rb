require_relative 'base'

module AdminCore
  module ResourceField
    # @!attribute [r] data
    #   @return [String]
    class Text < Base
      private

      # @note Implementation for {QiitaAdmin::ResourceField::Base#field_value}
      def field_value
        data.to_s[0...truncate_length]
      end

      # @return [Integer]
      def truncate_length
        options.fetch(:truncate, 50)
      end
    end

    AdminCore.register_resource_field(Text)
  end
end
