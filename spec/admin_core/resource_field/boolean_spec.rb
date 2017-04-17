require 'admin_core/resource_field/boolean'

RSpec.describe AdminCore::ResourceField::Boolean, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:user) },
                  name: 'admin'
end
