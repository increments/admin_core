module AdminCore
  module ViewObject
    class SidebarResourceLink
      # @param resource_manager [AdminCore::BaseResourceManager]
      def initialize(resource_manager)
        @resource_manager = resource_manager
      end

      def to_hash
        {
          displayName: resource_manager_hash[:displayName],
          link: resource_manager_hash[:indexPath],
          external: false,
          type: 'link'
        }
      end

      def resource_manager_hash
        @resource_manager_hash ||= @resource_manager.to_hash
      end
    end
  end
end
