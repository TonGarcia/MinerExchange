class Users::RegistrationsController < Devise::RegistrationsController
  layout 'sign'

  before_action :configure_sign_up_params, only: [:create]
  before_action :configure_account_update, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  # def destroy
  #   super
  # end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  protected

  # If you have extra params to permit, append them to the sanitizer.
  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:locale, :role])
  end

  # If you have extra params to permit, append them to the sanitizer.
  def configure_account_update
    devise_parameter_sanitizer.permit(:account_update, keys: [:locale])
  end

  # The path used after sign up.
  def after_sign_up_path_for(resource)
    super(resource)
    flash[:info] = t('devise.confirmations.send_instructions')
    flash.keep(:notice)
    new_session_path
  end

  # The path used after sign up for inactive accounts.
  def after_inactive_sign_up_path_for(resource)
    super(resource)
    flash[:info] = t('devise.confirmations.send_instructions')
    flash.keep(:notice)
    new_user_session_path
  end

  private

  def sign_up_params
    sup = params.require(:user).permit(%i[locale name email password password_confirmation remember_me])
    sup[:role] = Role.with_name :user
    sup
  end
end
