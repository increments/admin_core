require 'admin_core/resource_field_builder'

module AdminCore
  module ResourceField
    # @abstract Subclass and override {#field_value} to implement a custom resource field class.
    class Base
      # @return [Symbol]
      def self.type
        name.demodulize.underscore.to_sym
      end

      # @param name [Symbol]
      # @return [Symbol]
      def self.permitted_field_name_of(name)
        name
      end

      def self.register
        AdminCore::ResourceFieldBuilder.register(type, self)
      end

      # @param resource [ActiveRecord::Base]
      # @param name [Symbol]
      # @param options [Hash]
      # @param page [Symbol] :index, :new, :show or :edit
      # @raise [AdminCore::InvalidFieldDefinition]
      def initialize(resource, name, options, page)
        @resource = resource
        @name = name
        @options = options
        @page = page
        validate
      end

      # Representation of ResourceField type.
      #
      # @return [Hash]
      def to_hash
        {
          type: self.class.type,
          name: name,
          displayName: human_attribute_name,
          value: field_value,
        }
      end

      private

      attr_reader :resource, :name, :options, :page

      def field_value
        raise NotImplementedError
      end

      # Override this method to validate field definition.
      #
      # @raise [AdminCore::InvalidFieldDefinition]
      def validate; end

      def data
        resource.public_send(name)
      end

      def human_attribute_name
        resource.class.human_attribute_name(name)
      end
    end
  end
end
