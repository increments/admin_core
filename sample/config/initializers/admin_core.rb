AdminCore.configure do |config|
  config.module_name = "Admin"
end

Admin::Tweet
Admin::User
AdminCore.register_resource_manager(Admin::User)
AdminCore.register_resource_manager(Admin::Tweet)
