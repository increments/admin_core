require 'bundler/gem_tasks'
require 'rspec/core/rake_task'
require 'rubocop/rake_task'
require 'yard'

RSpec::Core::RakeTask.new do |task|
  task.verbose = false
end

RuboCop::RakeTask.new

YARD::Rake::YardocTask.new

task default: %i[spec rubocop]

task ci: %i[spec rubocop]

namespace :client do
  desc 'Update assets of generator templates'
  task bundle: :build do
    %w[admin-core.js admin-core.css].each do |name|
      cp "client/dist/#{name}", 'lib/generators/admin_core/templates/'
    end
  end

  task :build do
    Dir.chdir 'client' do
      sh 'yarn run build'
    end
  end
end
