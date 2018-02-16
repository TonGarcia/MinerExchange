module LocalizeHelper
  def current_locale
    I18n.locale[3,4].to_sym
  end

  def format_country_name(alpha2ISOCode)
    country = ISO3166::Country[alpha2ISOCode.uppercase]

  end

  def locale_action
    return 'new' if params[:action] == 'create'
    return 'edit' if params[:action] == 'update'
    params[:action]
  end
end