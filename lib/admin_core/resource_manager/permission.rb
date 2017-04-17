module AdminCore
  module ResourceManager
    module Permission
      extend ActiveSupport::Concern

      # @!method self.creatable?
      #   @return [Boolean]
      # @!method self.updatable?
      #   @return [Boolean]
      # @!method self.destroyable?
      #   @return [Boolean]
      class_methods do
        def creatable?
          field_names_for(:new).present?
        end

        # @return [Boolean]
        def updatable?
          field_names_for(:edit).present?
        end

        # @return [Boolean]
        def destroyable?
          instance_variable_defined?(:@destroyable) ? @destroyable : true
        end

        private

        def destroyable(value)
          @destroyable = value
        end
      end
    end
  end
end
