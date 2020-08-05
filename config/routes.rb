Pageflow::Vr::Engine.routes.draw do
  get 'vrview', to: 'static_files#vrview'
  get 'vrview2', to: 'static_files#vrview2'
end
