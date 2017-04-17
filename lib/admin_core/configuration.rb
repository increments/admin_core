module AdminCore
  # Stores AdminCore configuration information.
  class Configuration
    attr_accessor :route_name_prefix, :module_name, :template

    def module_name
      @module_name ||= 'Admin'
    end

    def route_name_prefix
      @route_name_prefix ||= module_name.underscore
    end

    def template
      @template ||= "#{route_name_prefix}/application"
    end
  end
end
