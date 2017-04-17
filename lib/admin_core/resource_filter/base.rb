module AdminCore
  module ResourceFilter
    class Base
      # @return [String]
      def self.default_query_operator
        'is'
      end

      # @return [String]
      def self.type
        name.demodulize.underscore.to_sym
      end

      # @param resource_manager [AdminCore::BaseResourceManager]
      # @param name [Symbol]
      # @param options [Hash]
      # @param query_operator [String]
      # @param query_value [String]
      def initialize(resource_manager, name, options, query_operator, query_value)
        @resource_manager = resource_manager
        @name = name
        @options = options
        @query_operator = query_operator
        @query_value = query_value
      end

      def empty?
        query_value ? query_value.empty? : true
      end

      def to_hash
        {
          type: self.class.type,
          name: name,
          displayName: display_name,
          query: {
            operator: query_operator,
            value: query_value,
          },
        }
      end

      # @param relation [ActiveRecord::Relation]
      # @return [ActiveRecord::Relation]
      def apply(relation) # rubocop:disable Lint/UnusedMethodArgument
        raise NotImplementedError
      end

      private

      attr_reader :resource_manager, :name, :options, :query_value

      # @return [String]
      def display_name
        resource_manager.class.resource_class.human_attribute_name(name)
      end

      def query_operator
        @query_operator || self.class.default_query_operator
      end
    end
  end
end
