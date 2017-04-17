require 'admin_core/base_resource_manager'
require 'rails'
require_relative 'factory_girl'

class Tweet < ActiveRecord::Base
  belongs_to :user
end

class User < ActiveRecord::Base
  has_many :tweets
end

FactoryGirl.define do
  factory :user do
    name 'User'
    admin false
    tweets_count 0
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

class TestApp < Rails::Application
  routes.draw do
    namespace :admin do
      resources :users
      resources :tweets
    end
  end
end
