require 'admin_core/resource_router'

module AdminCore
  module ResourceManager
    module Convert
      extend ActiveSupport::Concern

      # @!method self.to_hash
      #   Implementation for ResourceManager type in flow.
      #   @see client/javascripts/src/decls.js
      #   @return [Hash]
      # @!method self.param_name
      #   @return [Symbol]
      # @!method self.router
      #   @return [AdminCore::ResourceRouter]
      class_methods do
        def to_hash
          {
            displayName: resource_display_name,
            indexPath: router.index_path,
            newPath: creatable? ? router.new_path : nil,
            showPath: router.show_path(":#{param_name}"),
            editPath: updatable? ? router.edit_path(":#{param_name}") : nil,
          }
        end

        def param_name
          :id
        end

        def router
          @router ||= AdminCore::ResourceRouter.new(self)
        end
      end

      # @!method convert_for_index_page(resource)
      #   @param resource [ActiveRecord::Base]
      #   @return [Hash] Resource representation for ResourcePage$Index type
      # @!method convert_for_new_page(resource)
      #   @param resource [ActiveRecord::Base]
      #   @return [Hash] Resource representation for ResourcePage$New type
      # @!method convert_for_show_page(resource)
      #   @param resource [ActiveRecord::Base]
      #   @return [Hash] Resource representation for ResourcePage$Show type
      # @!method convert_for_edit_page(resource)
      #   @param resource [ActiveRecord::Base]
      #   @return [Hash] Resource representation for ResourcePage$Edit type
      %i[index new show edit].each do |page|
        define_method "convert_for_#{page}_page" do |resource|
          convert(resource, field_builders_for(page), page)
        end
      end

      # @return [Array<String>]
      def human_attribute_names_for_index
        self.class.field_names_for(:index).map do |name|
          self.class.resource_class.human_attribute_name(name)
        end
      end

      private

      # Implementation for Resource type in flow.
      # @see client/javascripts/src/qiita-admin/admin-core/decls.js
      # @param resource [ActiveRecord::Base]
      # @param field_builders [Array<AdminCore::ResourceFieldBuilder>]
      # @param page [Symbol]
      # @return [Hash]
      def convert(resource, field_builders, page)
        {
          displayName: display_resource(resource),
          name: name,
          showPath: show_path_for(resource),
          editPath: edit_path_for(resource),
          destroyable: self.class.destroyable?,
          fields: build_fields(resource, field_builders, page),
        }
      end

      def show_path_for(resource)
        resource.persisted? ? self.class.router.show_path(resource) : nil
      end

      def edit_path_for(resource)
        resource.persisted? && self.class.updatable? ? self.class.router.edit_path(resource) : nil
      end

      def build_fields(resource, field_builders, page)
        field_builders.map do |field_builder|
          field_builder.build(resource, page).to_hash
        end
      end
    end
  end
end
