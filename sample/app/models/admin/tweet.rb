module Admin
  class Tweet < AdminCore::BaseResourceManager
    register_scopes []

    define_field :id, :number
    define_field :body, :string
    define_field :created_at, :date_time
    define_field :updated_at, :date_time
    define_field :user, :belongs_to

    register_fields_for :index, [
      :id,
      :body,
      :created_at,
      :updated_at,
    ]

    register_fields_for :new, :edit, [
      :body,
      :user,
    ]

    register_fields_for :show, [
      :id,
      :body,
      :created_at,
      :updated_at,
      :user,
    ]

    destroyable true

    define_and_register_filter :body, :string
  end
end
