require 'rails_helper'

RSpec.describe LocalizeController, type: :controller do

  describe "GET #change" do
    it "returns http success" do
      get :change
      expect(response).to have_http_status(:success)
    end
  end

end
