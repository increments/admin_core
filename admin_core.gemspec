lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'admin_core/version'

Gem::Specification.new do |spec|
  spec.name          = 'admin_core'
  spec.version       = AdminCore::Version.to_s
  spec.authors       = ['Yuku Takahashi']
  spec.email         = ['yuku@qiita.com']

  spec.summary       = 'Flexible admin framework for Rails'
  spec.description   = spec.summary
  spec.homepage      = 'https://github.com/increments/admin_core'

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^spec/}) }
  spec.bindir        = 'exe'
  spec.executables   = spec.files.grep(%r{^exe/}) { |f| File.basename(f) }
  spec.require_paths = ['lib']

  spec.add_development_dependency 'bundler', '~> 1.12'
  spec.add_development_dependency 'rake', '~> 12.0'
  spec.add_development_dependency 'rspec', '~> 3.5'
  spec.add_development_dependency 'rubocop', '~> 0.48'
  spec.add_development_dependency 'yard', '~> 0.9'
end
