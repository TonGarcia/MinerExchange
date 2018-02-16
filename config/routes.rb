Rails.application.routes.draw do
  # Roles Management
  TheRoleManagementPanel::Routes.mixin(self)

  # Errors Routes
  match '/403', to: 'errors#forbidden', via: :all, as: :forbidden
  match '/404', to: 'errors#file_not_found', via: :all, as: :file_not_found
  match '/422', to: 'errors#unprocessable', via: :all, as: :unprocessable
  match '/500', to: 'errors#internal_server_error', via: :all, as: :internal_server_error

  # Locale Scope
  scope 'locale' do
    get 'change/:country' => 'localize#change', as: :locale_change
  end

  # DeviseUser sessions
  devise_for :users,
             controllers: {
                 unlocks: 'users/unlocks',
                 sessions: 'users/sessions',
                 passwords: 'users/passwords',
                 registrations: 'users/registrations',
                 confirmations: 'users/confirmations',
                 omniauth_callbacks: 'users/omniauth_callbacks'
             }

  # Not Persistence actions
  get 'dashboard', to: 'dashboard#index', as: :dashboard
  get 'networking', to: 'connections#index', as: :networking

  # Resources (CRUDs)
  resources :connections

  # Landing
  root to: 'home#index'
end
