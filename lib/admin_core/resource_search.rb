module AdminCore
  class ResourceSearch
    # @param resource_manager
    def initialize(resource_manager)
      @resource_manager = resource_manager
    end

    # @param filters [Array<AdminCore::ResourceFilter::Base>]
    # @return [ActiveRecord::Relation] resources for index page.
    def search(filters)
      resources = resource_manager.class.resource_class.all
      filters.reject(&:empty?).each do |filter|
        resources = filter.apply(resources)
      end
      resources
    end

    private

    attr_reader :resource_manager
  end
end
