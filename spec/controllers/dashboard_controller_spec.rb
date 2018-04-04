require 'rails_helper'

RSpec.describe DashboardController, type: :controller do

  describe "GET #mine" do
    it "returns http success" do
      get :mine
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #global" do
    it "returns http success" do
      get :global
      expect(response).to have_http_status(:success)
    end
  end

end
