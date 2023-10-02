source 'https://rubygems.org'

# Specify your gem's dependencies in pageflow-vr.gemspec
gemspec

if ENV['PAGEFLOW_DEPENDENCIES'] == 'experimental'
  git 'https://github.com/codevise/pageflow', branch: 'edge', glob: '**/*.gemspec' do
    gem 'pageflow'
    gem 'pageflow-support'
  end
else
  group :development, :test do
    # Help Bundler resolve dependencies
    gem 'rails', '~> 5.2.0'
  end
end
