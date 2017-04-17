module AdminCore
  class << self
    # @return [AdminCore::Configuration]
    def config
      @configuration ||= AdminCore::Configuration.new
    end

    # @yield [AdminCore::Configuration]
    # @example
    #   AdminCore.configure do |config|
    #     config.route_name_prefix = "admin_core"
    #   end
    def configure
      yield config if block_given?
    end

    # @param manager_class [Class]
    def register_resource_manager(manager_class)
      if resource_managers.include?(manager_class)
        raise AdminCore::ResourceManagerAlreadyRegistered, manager_class.resource_name
      end
      resource_managers.push(manager_class)
    end

    # @return [Array<Class>]
    def resource_managers
      @resource_managers ||= []
    end

    # @param field_class [Class] a child of {AdminCore::ResourceField::Base}
    def register_resource_field(field_class)
      if resource_field_map.key?(field_class.type)
        raise AdminCore::ResourceFilterAlreadyRegistered, field_class.type
      end
      resource_field_map[field_class.type] = field_class
    end

    # @return [Hash<Symbol, Class>]
    def resource_field_map
      @resource_fields ||= {}
    end
  end
end

require 'kaminari'

require 'admin_core/base_controller'
require 'admin_core/base_resource_manager'
require 'admin_core/configuration'
require 'admin_core/engine'
require 'admin_core/resource_field/belongs_to'
require 'admin_core/resource_field/boolean'
require 'admin_core/resource_field/date'
require 'admin_core/resource_field/date_time'
require 'admin_core/resource_field/enum'
require 'admin_core/resource_field/number'
require 'admin_core/resource_field/string'
require 'admin_core/resource_field/text'
require 'admin_core/resource_filter/boolean'
require 'admin_core/resource_filter/number'
require 'admin_core/resource_filter/string'
require 'admin_core/resource_page/edit'
require 'admin_core/resource_page/index'
require 'admin_core/resource_page/new'
require 'admin_core/resource_page/show'
require 'admin_core/view_object/sidebar_dropdown'
require 'admin_core/view_object/sidebar_link'
require 'admin_core/view_object/sidebar_resource_link'
require 'admin_core/view_object/sidebar_title'
