module AdminCore
  # Stores AdminCore configuration information.
  class Configuration
    DEFAULT_MODULE_NAME = 'Admin'.freeze

    attr_accessor :route_name_prefix, :module_name, :template

    def module_name
      @module_name ||= DEFAULT_MODULE_NAME
    end

    def route_name_prefix
      @route_name_prefix ||= module_name.underscore
    end

    def template
      @template ||= "#{route_name_prefix}/application"
    end
  end
end
