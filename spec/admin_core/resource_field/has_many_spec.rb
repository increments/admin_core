require 'admin_core/resource_field/has_many'

RSpec.describe AdminCore::ResourceField::HasMany, type: :resource_field do
  it_behaves_like 'AdminCore::ResourceField',
                  create_resource: -> { FactoryGirl.create(:user_with_tweets) },
                  name: :tweets
end
