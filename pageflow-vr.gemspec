# coding: utf-8
lib = File.expand_path('../lib', __FILE__)
$LOAD_PATH.unshift(lib) unless $LOAD_PATH.include?(lib)
require 'pageflow/vr/version'

Gem::Specification.new do |spec|
  spec.name          = 'pageflow-vr'
  spec.version       = Pageflow::Vr::VERSION
  spec.authors       = ['Codevise Solutions']
  spec.email         = ['info@codevise.de']
  spec.summary       = 'Page type for 360° videos based on Google Vrview.'
  spec.homepage      = 'https://github.com/codevise/pageflow-vr'
  spec.license       = 'MIT'

  spec.files         = `git ls-files -z`.split("\x0").reject { |f| f.match(%r{^(test|spec|features)/}) }
  spec.require_paths = ['lib']

  spec.required_ruby_version = '~> 2.1'

  spec.add_dependency 'pageflow', '~> 12.x'
  spec.add_dependency 'pageflow-public-i18n', '~> 1.10'

  spec.add_development_dependency 'bundler', '~> 1.12'
  spec.add_development_dependency 'rake', '~> 12.0'
  spec.add_development_dependency 'rspec', '~> 3.0'
  spec.add_development_dependency 'semmy', '~> 1.0'
end
