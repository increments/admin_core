require_relative 'resource_manager/buildable'
require_relative 'resource_manager/convert'
require_relative 'resource_manager/has_many_fields'
require_relative 'resource_manager/permission'
require_relative 'resource_manager/searchable'

module AdminCore
  # @abstract
  class BaseResourceManager
    include AdminCore::ResourceManager::Buildable
    include AdminCore::ResourceManager::Convert
    include AdminCore::ResourceManager::HasManyFields
    include AdminCore::ResourceManager::Searchable
    include AdminCore::ResourceManager::Permission

    private

    # @param resource [ActiveRecord::Base]
    # @return [String]
    def display_resource(resource)
      "#{resource.class} ##{resource.id}"
    end
  end
end
