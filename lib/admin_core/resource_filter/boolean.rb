require_relative 'base'

module AdminCore
  module ResourceFilter
    class Boolean < Base
      # @note Implementation for {AdminCore::ResourceFilter::Base#apply}
      def apply(relation)
        case query_operator
        when 'is'
          relation.where(name => %w[true yes on 1].include?(query_value))
        else
          raise NotImplementedError
        end
      end
    end
  end
end
