require_relative 'base'

module AdminCore
  module ResourcePage
    class Show < Base
      # Implementation for ResourcePage$Show type.
      # @see client/javascripts/src/qiita-admin/admin-core/decls.js
      def to_hash
        {
          resource: resource_manager.convert_for_show_page(resource)
        }
      end

      private

      # @return [ActiveRecord::Base]
      def resource
        @resource ||= resource_manager.find(params)
      end
    end
  end
end
