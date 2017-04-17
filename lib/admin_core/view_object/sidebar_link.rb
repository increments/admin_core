module AdminCore
  module ViewObject
    class SidebarLink
      # @param name [String]
      # @param link [String]
      # @param external [Boolean]
      def initialize(name, link, external = false)
        @name = name
        @link = link
        @external = external
      end

      # @note Implements SidebarLink flow type
      def to_hash
        {
          displayName: @name,
          link: @link,
          external: @link =~ %r{://} || @external,
          type: 'link'
        }
      end
    end
  end
end
