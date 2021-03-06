# AdminCore

[![Gem Version](http://img.shields.io/gem/v/admin_core.svg?style=flat)](http://badge.fury.io/rb/admin_core)
[![Dependency Status](http://img.shields.io/gemnasium/increments/admin_core.svg?style=flat)](https://gemnasium.com/increments/admin_core)
[![CircleCI](https://circleci.com/gh/increments/admin_core.svg?style=shield)](https://circleci.com/gh/increments/admin_core)
[![Coverage Status](https://img.shields.io/codeclimate/coverage/github/increments/admin_core.svg)](https://codeclimate.com/github/increments/admin_core/coverage)
[![Code Climate](https://img.shields.io/codeclimate/github/increments/admin_core.svg?style=flat)](https://codeclimate.com/github/increments/admin_core)

A flexible admin framework for Rails

:warning: AdminCore is not production ready.

## Getting Started

Add this line to your application's Gemfile:

```rb
gem 'admin_core'
```

Re-bundle, then run the installer:

```bash
$ rails g admin_core:install
```

This generates:

- app/controllers/admin/application_controller.rb
- app/views/admin/application.html.erb
- config/initializers/admin_core.rb

There is another generator to generate resource manager class:

```bash
$ rails g admin_core:resource_manager user
```

This generates:

- app/models/admin/user.rb

Add route to AdminCore:

```rb
# config/routes.rb
Rails.application.routes.draw do
  namespace :admin do
    resources :users
  end
end
```

Restart server and access http://localhost:3000/admin/users
