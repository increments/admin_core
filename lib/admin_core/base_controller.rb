require 'action_controller'

module AdminCore
  # @abstract
  class BaseController < ActionController::Base
    def index
      respond_to do |format|
        format.html do
          render template: AdminCore.config.template
        end
        format.json do
          render json: { page: AdminCore::ResourcePage::Index.new(resource_manager, params) }
        end
      end
    end

    def new
      respond_to do |format|
        format.html do
          render template: AdminCore.config.template
        end
        format.json do
          render json: { page: AdminCore::ResourcePage::New.new(resource_manager, params) }
        end
      end
    end

    def create
      resource = resource_manager.build(params_for_create)
      if resource.save
        render json: { redirectTo: resource_router.show_path(resource) }
      else
        render_errors(resource)
      end
    end

    def show
      respond_to do |format|
        format.html do
          render template: AdminCore.config.template
        end
        format.json do
          render json: { page: AdminCore::ResourcePage::Show.new(resource_manager, params) }
        end
      end
    end

    def edit
      respond_to do |format|
        format.html do
          render template: AdminCore.config.template
        end
        format.json do
          render json: { page: AdminCore::ResourcePage::Edit.new(resource_manager, params) }
        end
      end
    end

    def update
      resource = resource_manager.find(params)
      if resource.update(params_for_update)
        render json: { redirectTo: resource_router.show_path(resource) }
      else
        render_errors(resource)
      end
    end

    def destroy
      resource = resource_manager.find(params)
      if resource.destroy
        render json: { redirectTo: resource_router.index_path }
      else
        render_errors(resource)
      end
    end

    private

    # @param resource [ActiveRecord::Base]
    def render_errors(resource)
      errors = {}
      resource.errors.messages.keys.each do |key|
        errors[key] = resource.errors.full_messages_for(key)
      end
      render json: { errors: errors }, status: :unprocessable_entity
    end

    # @return [AdminCore::BaseResourceManager]
    def resource_manager
      @resource_manager ||= resource_manager_class.new
    end

    # @return [AdminCore::ResourceRouter]
    def resource_router
      resource_manager_class.router
    end

    # @return [Class]
    def resource_manager_class
      resource_name = controller_path.singularize.split('/')[-1]
      "#{AdminCore.config.module_name}::#{resource_name.camelize}".constantize
    end

    # @return [ActionController::Parameters]
    def params_for_create
      params.require(resource_manager.name).permit(resource_manager.permitted_field_names_for(:new))
    end

    # @return [ActionController::Parameters]
    def params_for_update
      params.require(resource_manager.name).permit(resource_manager.permitted_field_names_for(:edit))
    end
  end
end
