module ApplicationHelper
  # Must return it product name
  def product_name
    t('descriptions.product_name')
  end

  # Must return it app name based on user locale (default is pt-BR)
  def app_name
    t('descriptions.product_name').remove(' ')
  end

  # Must return ittem app slogan phrase based on user locale (default is pt-BR)
  def slogan
    # 'A maneira mais fácil de pré-qualificar ao Atlas.'
    ''
  end

  # svg helper
  def svg(name)
    file_path = "#{Rails.root}/app/views/layouts/icons/set/#{name}.svg"
    return File.read(file_path).html_safe if File.exists?(file_path)
    '(not found)'
  end

  # Return it app_name with it slogan
  def app_name_slogan
    "#{app_name} - #{slogan}"
  end

  def app_footer_description
    "#{app_name} - #{slogan}"
  end

  # Check if it page allow default card
  def card_page?
    current_act = params[:action]
    current_ctrl = params[:controller]
    dashboard_ctrl = (current_ctrl == 'dashboard')
    professional_card_act = (current_ctrl == 'professionals' && current_act != 'index')
    !(dashboard_ctrl || professional_card_act)
  end

  def company_footer_description
    "Copyright© & Registered® #{Date.today.year}."
  end

  # Return the current screen Title/Header name: CONTROLLER / ACTION
  def screen_name
    controller_name = t("controllers.#{params[:controller]}").upcase
    action_name = t("actions.controllers.#{params[:action]}").upcase
    "#{controller_name} / #{action_name}"
  end

  def read_only?
    params[:action] == 'show'
  end
end