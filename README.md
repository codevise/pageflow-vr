# Pageflow VR

[![Gem Version](https://badge.fury.io/rb/pageflow-vr.svg)](http://badge.fury.io/rb/pageflow-vr)

Page type to display 360° videos.

## Installation

Add this line to your application's Gemfile:

    # Gemfile
    gem 'pageflow-vr'

Register the plugin:

    # config/initializers/pageflow.rb
    Pageflow.configure do |config|
      config.plugin(Pageflow::Vr.plugin)
    end

Include javascripts and stylesheets:

    # app/assets/javascripts/components.js
    //= require "pageflow/vr/components"

    # app/assets/javascripts/pageflow/application.js
    //= require "pageflow/vr"

    # app/assets/javascripts/pageflow/editor.js
    //= require pageflow/vr/editor

    # app/assets/stylesheets/pageflow/themes/default.scss
    @import "pageflow/vr/themes/default";

Install the routes:

    # config/routes.rb
    MyPageflow::Application.routes.draw do
      Pageflow::Vr.routes(self)
    end

Execute `bundle install` and restart the application server.

Now you can enable the page type in your feature settings.

## Troubleshooting

If you run into problems while installing the page type, please also
refer to the
[Troubleshooting](https://github.com/codevise/pageflow/wiki/Troubleshooting)
wiki page in the
[Pageflow repository](https://github.com/codevise/pageflow). If that
doesn't help, consider
[filing an issue](https://github.com/codevise/pageflow-vr/issues).

## Contributing Locales

Edit the translations directly on the
[pageflow-vr](http://www.localeapp.com/projects/public?search=tf/pageflow-vr)
locale project.
