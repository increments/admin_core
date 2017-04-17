require 'admin_core/resource_field/date_time'

RSpec.describe AdminCore::ResourceField::DateTime, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:user) },
                  name: 'created_at'
end
