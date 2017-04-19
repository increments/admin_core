require 'admin_core/base_resource_manager'
require 'rails'
require_relative 'factory_girl'

class Tweet < ActiveRecord::Base
  belongs_to :user, counter_cache: true
end

class User < ActiveRecord::Base
  has_many :tweets
end

FactoryGirl.define do
  factory :user do
    name 'User'
    admin false

    factory :user_with_tweets do
      transient do
        tweets_count 5
      end

      after(:create) do |user, evaluator|
        create_list(:tweet, evaluator.tweets_count, user: user)
      end
    end
  end

  factory :tweet do
    body 'Tweet body'
    user
  end
end

module Admin
  class User < AdminCore::BaseResourceManager
  end

  class Tweet < AdminCore::BaseResourceManager
  end
end

AdminCore.register_resource_manager(Admin::User)
AdminCore.register_resource_manager(Admin::Tweet)

class TestApp < Rails::Application
  routes.draw do
    namespace :admin do
      resources :users
      resources :tweets
    end
  end
end
