require_relative 'base'

module AdminCore
  module ResourcePage
    class New < Base
      # Implementation for ResourcePage$New type.
      # @see client/javascripts/src/qiita-admin/admin-core/decls.js
      def to_hash
        {
          resource: resource_manager.convert_for_new_page(resource)
        }
      end

      private

      # @return [ActiveRecord::Base]
      def resource
        @resource ||= resource_manager.build(permitted_params)
      end

      def permitted_params
        params[resource_manager.name].try(:permit, resource_manager.permitted_field_names_for(:new))
      end
    end
  end
end
