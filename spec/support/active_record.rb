require 'active_record'

ActiveRecord::Base.establish_connection adapter: 'sqlite3', database: ':memory:'

ActiveRecord::Schema.define do
  self.verbose = false

  create_table :users, force: true do |t|
    t.string :name
    t.integer :articles_count

    t.timestamps
  end

  create_table :articles, force: true do |t|
    t.string :title
    t.references :user

    t.timestamps
  end
end
