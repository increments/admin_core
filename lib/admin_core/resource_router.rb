require 'admin_core'

module AdminCore
  class ResourceRouter
    def self.url_helpers
      @url_helpers ||= Rails.application.routes.url_helpers
    end

    # @param resource_manager_class [Class]
    def initialize(resource_manager_class)
      @resource_manager_class = resource_manager_class
    end

    # @return [String]
    def index_path
      url_for(controller: controller, action: 'index', only_path: true)
    end

    # @return [String]
    def new_path
      url_for(controller: controller, action: 'new', only_path: true)
    end

    # @param param [String, ActiveRecord::Base]
    # @return [String]
    def show_path(param)
      url_for(controller: controller, action: 'show', id: strip(param), only_path: true)
    end

    # @param param [String]
    # @return [String]
    def edit_path(param)
      url_for(controller: controller, action: 'edit', id: strip(param), only_path: true)
    end

    private

    attr_reader :resource_manager_class

    delegate :resource_class, to: :resource_manager_class
    delegate :url_for, to: :url_helpers

    def controller
      "#{AdminCore.config.route_name_prefix}/#{resource_class.model_name.plural}"
    end

    def url_helpers
      self.class.url_helpers
    end

    # @param param [String, ActiveRecord::Base]
    # @return [String]
    def strip(param)
      return param.public_send(resource_manager_class.param_name) if param.is_a?(ActiveRecord::Base)
      param
    end
  end
end
