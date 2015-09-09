require 'susy'

configure :development do
  activate :livereload
end

set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

activate :i18n,
         langs: [:en, :es, :pt],
         mount_at_root: :en

configure :build do
  activate :gzip
  activate :minify_html
  activate :minify_css
  activate :minify_javascript

  activate :asset_hash
end
