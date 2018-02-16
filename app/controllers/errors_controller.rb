class ErrorsController < ApplicationController
  # 404
  def file_not_found
    render file: 'public/404.html.slim', status: :not_found, layout: 'errors'
  end

  # 403
  def forbidden
    render file: 'public/403.html.slim', status: :not_found, layout: 'errors'
  end

  # 500
  def internal_server_error
    render file: 'public/500.html.slim', status: :not_found, layout: 'errors'
  end

  # # DRY error display
  # def show
  #   render file: "public/#{params[:code]}.html.slim", status: :not_found, layout: layout_setup
  # end

  protected
  def login_not_required
    true
  end

  private
  def layout_setup
    # current_user.nil? ? error_layout = 'landing_page' : error_layout = 'errors'
    self.class.layout 'errors'
  end
end