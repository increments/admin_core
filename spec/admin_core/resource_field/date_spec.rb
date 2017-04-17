require 'admin_core/resource_field/date'

RSpec.describe AdminCore::ResourceField::Date, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:user) },
                  name: 'created_at'
end
