module UsersHelper
  def confirmation_token_url
    confirmation_url(@resource, confirmation_token: @token).gsub /m\/{2,}/, 'm/'
  end

  def devise_flash
    resource.errors.full_messages
  end
end
