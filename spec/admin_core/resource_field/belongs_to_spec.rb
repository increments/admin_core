require 'admin_core/resource_field/belongs_to'

RSpec.describe AdminCore::ResourceField::BelongsTo, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:tweet) },
                  name: 'user',
                  options: {
                    resource_manager_class: Admin::User
                  }
end
