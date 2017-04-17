require 'admin_core/resource_field/string'

RSpec.describe AdminCore::ResourceField::String, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:user) },
                  name: 'name'
end
