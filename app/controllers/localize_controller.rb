class LocalizeController < ApplicationController
  def change
    country = params[:country]
    case country
      when 'br'
        session[:locale] = 'pt-br'
      when 'us'
        session[:locale] = 'en-us'
      when 'fr'
        session[:locale] = 'fr-fr'
      else
        session[:locale] = 'pt-br'
    end

    redirect_back fallback_location: root_path
  end

  def login_not_required
    true
  end
end