module AdminCore
  # @!attribute name
  #   @return [Symbol]
  # @!attribute type
  #   @return [Symbol]
  # @!attribute options
  #   @return [Symbol]
  ResourceFilterBuilder = Struct.new(:name, :type, :options) do
    # @param resource_manager [AdminCore::BaseResourceManager]
    # @param params [ActionController::Parameters]
    # @return [AdminCore::ResourceFilter::Base]
    def build(resource_manager, params)
      query_operator, query_value = parse(params)
      resource_filter_class.new(resource_manager, name, options, query_operator, query_value)
    end

    private

    # @return [Class]
    def resource_filter_class
      @resource_filter_class ||= AdminCore.resolve_resource_filter(type)
    end

    def regexp
      @regexp = /\A#{name}(?::(\w+))?\z/
    end

    def parse(params)
      params.keys.each do |key|
        if (match = regexp.match(key))
          return [match[1] || resource_filter_class.default_query_operator, params[key]]
        end
      end
      []
    end
  end
end
