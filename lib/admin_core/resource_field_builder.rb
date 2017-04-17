require 'set'
require 'admin_core/errors'

module AdminCore
  class ResourceFieldBuilder
    # @param type [Symbol]
    # @return [Class]
    # @raise [AdminCore::FieldNotFound]
    def self.resolve(type)
      unless AdminCore.resource_field_map.key?(type)
        raise AdminCore::FieldNotFound, "Unknown field: #{type}"
      end
      AdminCore.resource_field_map[type]
    end

    # @param name [Symbol]
    # @param type [Symbol, Class]
    # @param options [Symbol]
    def initialize(name, type, options)
      @name = name
      @type = type
      @options = options
    end

    # @param resource [ActiveRecord::Base]
    # @param page [Symbol]
    # @return [AdminCore::ResourceField::Base]
    # @raise [AdminCore::FieldNotFound]
    def build(resource, page)
      resource_field_class.new(resource, name, options, page)
    end

    # @return [Symbol]
    # @raise [AdminCore::FieldNotFound]
    def permitted_field_name
      resource_field_class.permitted_field_name_of(name)
    end

    private

    attr_reader :name, :type, :options

    # @return [Class]
    def resource_field_class
      @resource_field_class ||= self.class.resolve(type)
    end
  end
end
