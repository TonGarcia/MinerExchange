class User < ApplicationRecord
  # Include default devise modules. Others available are:
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable,
         :lockable, :timeoutable, :omniauthable

  # TheRole gem included
  include TheRole::Api::User

  def moderator?
    self.role.name == 'moderator'
  end
end
