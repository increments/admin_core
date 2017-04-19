require_relative 'base'

module AdminCore
  module ResourceFilter
    class Number < Base
      def self.default_query_operator
        'equals'
      end

      # @note Implementation for {AdminCore::ResourceFilter::Base#apply}
      def apply(relation) # rubocop:disable Metrics/AbcSize
        case query_operator
        when 'equals'
          relation.where(name => query_value)
        when 'greater_than'
          relation.where(relation.arel_table[name].gt(query_value))
        when 'less_than'
          relation.where(relation.arel_table[name].lt(query_value))
        else
          raise NotImplementedError
        end
      end

      AdminCore.register_resource_filter(Number)
    end
  end
end
