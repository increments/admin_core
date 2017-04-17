require_relative 'base'

module AdminCore
  module ResourcePage
    class Index < Base
      # Implementation for ResourcePage$Index type.
      # @see client/javascripts/src/qiita-admin/admin-core/decls.js
      def to_hash
        {
          attributes: attributes,
          resources: resources.map { |resource| resource_manager.convert_for_index_page(resource) },
          filters: filters,
          scopes: scopes,
          pagination: {
            current: resources.current_page,
            total: resources.total_pages,
          },
        }
      end

      private

      def attributes
        resource_manager.human_attribute_names_for_index
      end

      def scopes
        resource_manager.class.scopes.map do |scope|
          { name: scope, count: searched_resources.public_send(scope).count }
        end
      end

      def searched_resources
        @searched_resources ||= resource_manager.search(filters)
      end

      def resources
        @resources ||= searched_resources.public_send(scope).page(params[:page])
      end

      # @return [Array<AdminCore::ResourceFilter::Base>]
      def filters
        @filters ||= resource_manager.build_filters(params)
      end

      # @return [Symbol]
      def scope
        params[:scope] || :all
      end
    end
  end
end
