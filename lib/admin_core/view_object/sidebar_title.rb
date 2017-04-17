module AdminCore
  module ViewObject
    class SidebarTitle
      # @param name [String]
      def initialize(name)
        @name = name
      end

      # @note Implements SidebarTitle flow type
      def to_hash
        {
          displayName: @name,
          type: 'title'
        }
      end
    end
  end
end
