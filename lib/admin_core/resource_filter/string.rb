require_relative 'base'

module AdminCore
  module ResourceFilter
    class String < Base
      def self.default_query_operator
        'equals'
      end

      # @note Implementation for {AdminCore::ResourceFilter::Base#apply}
      def apply(relation) # rubocop:disable Metrics/MethodLength, Metrics/AbcSize
        case query_operator
        when 'contains'
          relation.where(relation.arel_table[name].matches("%#{query_value}%"))
        when 'equals'
          relation.where(name => query_value)
        when 'starts_with'
          relation.where(relation.arel_table[name].matches("#{query_value}%"))
        when 'ends_with'
          relation.where(relation.arel_table[name].matches("%#{query_value}"))
        else
          raise NotImplementedError, query_operator
        end
      end
    end
  end
end
