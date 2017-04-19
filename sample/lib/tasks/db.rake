namespace :db do
  # Add db:seed_fu to the dependencies of db:seed so that db:reset
  # automatically invokes db:seed_fu.
  task seed: :seed_fu
end
