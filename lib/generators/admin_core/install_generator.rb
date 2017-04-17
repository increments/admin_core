require 'admin_core/configuration'

module AdminCore
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path('../templates', __FILE__)

      class_option :module_name, type: :string,
                                 default: AdminCore::Configuration::DEFAULT_MODULE_NAME,
                                 desc: 'Module which contains resource manager, controllers, etc.',
                                 aliases: :m

      def initializer
        template('initializer.rb.erb', 'config/initializers/admin_core.rb')
      end

      def view
        copy_file('view.html.erb', "app/views/#{configuration.template}.html.erb")
      end

      def controller
        template('controller.rb.erb', "app/controllers/#{configuration.route_name_prefix}/application_controller.rb")
      end

      def assets
        copy_file('admin-core.js', 'public/javascripts/admin-core.js')
        copy_file('admin-core.css', 'public/stylesheets/admin-core.css')
      end

      private

      def configuration
        @configuration ||= AdminCore::Configuration.new.tap do |config|
          config.module_name = options[:module_name].camelize
        end
      end
    end
  end
end
