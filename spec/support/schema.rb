ActiveRecord::Schema.define do
  self.verbose = false

  create_table 'tweets', force: :cascade do |t|
    t.integer  'user_id'
    t.string   'body'
    t.datetime 'created_at', null: false
    t.datetime 'updated_at', null: false
    t.index ['user_id'], name: 'index_tweets_on_user_id'
  end

  create_table 'users', force: :cascade do |t|
    t.string   'name'
    t.boolean  'admin'
    t.integer  'tweets_count'
    t.datetime 'created_at',  null: false
    t.datetime 'updated_at',  null: false
  end
end
