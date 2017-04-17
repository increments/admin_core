module AdminCore
  module ViewObject
    class SidebarDropdown
      # @param name [String]
      # @param links [Array<SidebarLink, SidebarResourceLink>]
      def initialize(name, links)
        @name = name
        @links = links
      end

      # @note Implements SidebarDropdown flow type
      def to_hash
        {
          displayName: @name,
          links: @links,
          type: 'dropdown'
        }
      end
    end
  end
end
