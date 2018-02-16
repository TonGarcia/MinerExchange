ruby '2.4.1'
#ruby=2.4.1@miner_exchange
source 'https://rubygems.org'

git_source(:github) do |repo_name|
  repo_name = "#{repo_name}/#{repo_name}" unless repo_name.include?("/")
  "https://github.com/#{repo_name}.git"
end


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '~> 5.1.4'
# Use mysql as the database for Active Record
gem 'mysql2', '>= 0.3.18', '< 0.5'
# Use Puma as the app server
gem 'puma', '~> 3.7'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.2'
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem 'turbolinks', '~> 5'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.5'
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 3.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Use jquery as the JavaScript library
gem 'jquery-rails', '~> 4.3', '>= 4.3.1'

=begin
 ######################    AdditionalGEMs    #################################
=end

# Animated Progress link/screen transaction
gem 'nprogress-rails', '~> 0.2.0.2'

# Session manager
gem 'devise', '~> 4.3.0'

# Faster & easier HTML
gem 'slim-rails', '~> 3.1.2'

# Breadcrumbs for Rails app
gem 'breadcrumbs_on_rails', '~> 3.0.1'

# Format legal documents
gem 'cpf_cnpj', '~> 0.3.0'

# ENUM gem
gem 'enumerate_it', '~> 1.6.1'

# Devise user's roles manager
gem 'the_role', '~> 3.8', '>= 3.8.31'

=begin
 ######################    Social & new Design GEMs    #################################
=end

# OAuth
# gem 'koala', '~> 2.2.0'
gem 'omniauth', '~> 1.7.0'
gem 'omniauth-oauth2', '~> 1.4.0'
gem 'omniauth-facebook', '~> 4.0.0'

# Social
# gem 'rest-graph', '~> 2.0', '>= 2.0.3'

# JS Graph Visualization
gem 'd3_rails', '~> 4.1', '>= 4.1.1'

# World Countries Flags
gem 'world-flags', '~> 0.6.5'
# ISO Country Codes to use WorldFlags & Internationalize
gem 'countries', '~> 2.1.2'
# ISO Cities
# gem 'cities', '~> 0.3.1'
gem 'city-state', '~> 0.0.13'

# IconFonts - Themify
gem 'themify-icons-rails', github: 'scratch-soft/themify-icons-rails'

# ionic IconFonts
gem 'ionicons-rails', '~> 2.0'

# IconFonts - FontAwesome
gem 'font-awesome-rails', '~> 4.7', '>= 4.7.0.2'

# Creative-Tim assets Private-GEM
source 'https://B14-9aQKAAQ2Vzjx4UhV@gem.fury.io/tongarcia/' do
  gem 'creative_tim', '~> 0.0.7'
end


=begin
 ######################    Test & Debug GEMs    #################################
=end

# Color to the prints on console (PUTS)
gem 'colorize', '~> 0.8.1'

group :development, :test do
  # RSPec for BDD practices
  gem 'rspec-rails', '~> 3.6.1'

  # Option to not use Fixtures (FactoryGirl)
  gem 'factory_girl_rails', '~> 4.8.0'

  # Create readable attrs values
  gem 'faker', '~> 1.8.4'

  # RSPec Plugin for testing Views
  gem 'capybara', '~> 2.15.1'

  # RSPec Plugin for code-coverage
  gem 'simplecov', '~> 0.15.1'

  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
end

group :development do
  # Access an IRB console on exception pages or by using <%= console %> anywhere in the code.
  gem 'web-console', '~> 3.5.1'
  gem 'listen', '>= 3.0.5', '< 3.2'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'
  gem 'spring-watcher-listen', '~> 2.0.0'

  # Thin is better for localhost
  gem 'thin', '~> 1.7.2'
end


=begin
 ######################    Production GEMs    #################################
=end

# SendGrid send e-mail
gem 'mail', '~> 2.6.6'

# Heroku pre compile
gem 'rails_12factor', group: :production

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
