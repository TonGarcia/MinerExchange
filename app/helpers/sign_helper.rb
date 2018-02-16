module SignHelper
  def has_alerts?
    flash[:alert] || flash[:info]
  end


  def devise_alerts
    if flash[:alert]
      raw("<div class='alert alert-warning'> <span>#{flash[:alert]}</span> </div>")
    elsif flash[:info]
      raw("<div class='alert alert-info'> <span>#{flash[:info]}</span> </div>")
    end
  end

  def sign_up_page?
    params['controller'].index('registrations')
  end

  def user_action_title
    t("controllers.#{params[:controller]}")
  end
end
