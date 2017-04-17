module AdminCore
  module ResourcePage
    # @abstract
    class Base
      # @param resource_manager [AdminCore::BaseResourceManager]
      # @param params [ActionController::Parameters]
      def initialize(resource_manager, params)
        @resource_manager = resource_manager
        @params = params
      end

      private

      attr_reader :resource_manager, :params
    end
  end
end
