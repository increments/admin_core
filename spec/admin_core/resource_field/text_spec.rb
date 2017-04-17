require 'admin_core/resource_field/text'

RSpec.describe AdminCore::ResourceField::Text, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:tweet) },
                  name: 'body'
end
