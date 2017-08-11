require "bundler/gem_tasks"
require "rspec/core/rake_task"

require 'semmy'
Semmy::Tasks.install

RSpec::Core::RakeTask.new(:spec)

task :default => :spec
