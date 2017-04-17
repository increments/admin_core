require 'admin_core/resource_field_builder'

module AdminCore
  module ResourceManager
    module HasManyFields
      extend ActiveSupport::Concern

      # @!method self.field_builders
      #   @return [Hash<Symbol, AdminCore::ResourceFieldBuilder>]
      # @!method self.field_names_for(page)
      #   @param page [Symbol]
      #   @return [Array<Symbol>]
      class_methods do
        def field_builders
          @field_builders ||= {}
        end

        def field_names_for(page)
          @page_fields ||= {}
          @page_fields[page] || []
        end

        private

        # @param name [Symbol]
        # @param type [Symbol, Class] built-in type name or a resoure field class
        # @param options [Hash]
        def define_field(name, type, options = {})
          field_builders[name] = AdminCore::ResourceFieldBuilder.new(name, type, options)
        end

        # @param pages [Array<Symbol>]
        # @param fields [Array<Symbol>]
        def register_fields_for(*pages, fields)
          @page_fields ||= {}
          pages.each do |page|
            @page_fields[page] = fields
          end
        end
      end

      # @param page [Symbol]
      # @return [Array<Symbol>]
      def permitted_field_names_for(page)
        field_builders_for(page).map(&:permitted_field_name)
      end

      # @param params [ActionController::Parameters]
      # @return [Array<AdminCore::ResourceFilter::Base>]
      def build_filters(params)
        self.class.filter_builders.map do |filter_builder|
          filter_builder.build(self, params[:filter] || {})
        end
      end

      private # rubocop:disable Lint/UselessAccessModifier

      # @param page [Symbol]
      # @return [Array<AdminCore::ResourceFieldBuilder>]
      def field_builders_for(page)
        self.class.field_names_for(page).map(&method(:field_builder_for))
      end

      # @param name [Symbol]
      # @return [AdminCore::ResourceFieldBuilder]
      def field_builder_for(name)
        self.class.field_builders[name]
      end
    end
  end
end
