require 'admin_core/resource_filter_builder'
require 'admin_core/resource_search'

module AdminCore
  module ResourceManager
    module Searchable
      extend ActiveSupport::Concern

      # @!method self.filter_builders
      #   @return [Array<AdminCore::ResourceFieldBuilder>]
      # @!method self.scopes
      #   @return [Array<Symbol>]
      class_methods do
        def filter_builders
          @filter_builders ||= []
        end

        def scopes
          @scopes || []
        end

        private

        # @param values [Array<Symbol>]
        def register_scopes(values)
          @scopes = values
        end

        # @param name [Symbol]
        # @param type [Symbol]
        # @param options [Hash]
        def define_and_register_filter(name, type, options = {})
          filter_builders.push(AdminCore::ResourceFilterBuilder.new(name, type, options))
        end
      end

      # @!method search
      #   Delegate to {AdminCore::ResourceSearch#search}
      included do
        delegate :search, to: :resource_search
      end

      # @param params [ActionController::Parameters]
      # @return [ActiveRecord::Base]
      def find(params)
        self.class.resource_class.find_by(self.class.param_name => params[self.class.param_name])
      end

      private # rubocop:disable Lint/UselessAccessModifier

      # @return [AdminCore::ResourceSearch]
      def resource_search
        AdminCore::ResourceSearch.new(self)
      end
    end
  end
end
