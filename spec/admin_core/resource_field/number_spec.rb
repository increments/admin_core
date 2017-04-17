require 'admin_core/resource_field/number'

RSpec.describe AdminCore::ResourceField::Number, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:user) },
                  name: 'tweets_count'
end
