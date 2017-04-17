module Admin
  class User < AdminCore::BaseResourceManager
    register_scopes []

    define_field :id, :number
    define_field :name, :string
    define_field :admin, :boolean
    define_field :tweets_count, :number
    define_field :created_at, :date_time
    define_field :updated_at, :date_time
    # define_field :tweets, :has_many

    register_fields_for :index, [
      :id,
      :name,
      :admin,
      :tweets_count,
    ]

    register_fields_for :new, :edit, [
      :name,
      :admin,
      # :tweets,
    ]

    register_fields_for :show, [
      :id,
      :name,
      :admin,
      :tweets_count,
      :created_at,
      :updated_at,
      # :tweets,
    ]

    destroyable true

    define_and_register_filter :name, :string
    define_and_register_filter :admin, :boolean
  end
end
