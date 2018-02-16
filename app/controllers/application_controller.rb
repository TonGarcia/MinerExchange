class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  before_action :setup_user, unless: :login_not_required
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :set_locale
  layout :solve_layout

  # Update user locale
  def set_locale
    I18n.locale = session[:locale] || I18n.default_locale
  end

  # 404 Rendered
  def not_found
    raise ActionController::RoutingError.new('Not Found')
  end

  protected

  # Config devise params
  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: %i[locale name email password password_confirmation remember_me])
    devise_parameter_sanitizer.permit(:sign_in, keys: %i[login email password remember_me])
    devise_parameter_sanitizer.permit(:account_update, keys: %i[password password_confirmation current_password])
    @current_user ||= current_user
  end

  # Call the Authenticate & set it @current_user up
  def setup_user
    current_user.nil? ? authenticate_user! : @current_user = current_user
  end

  # Every controller which doesn't need session, like API, must change it
  def login_not_required
    false
  end

  protected

  def solve_layout
    case params[:controller]
      when 'home'
        'landing'
      else
        'application'
    end
  end

  private

  # Overwriting the sign_out redirect path method
  def after_sign_out_path_for(_resource_or_scope)
    new_user_session_path
  end
end
