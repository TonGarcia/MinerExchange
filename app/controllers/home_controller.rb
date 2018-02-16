class HomeController < ApplicationController
  def index
  end

  protected
  def login_not_required
    true
  end
end
