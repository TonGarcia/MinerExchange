# This migration comes from the_role_engine (originally 20111025025129)
class CreateRoles < ActiveRecord::Migration[5.1]
  def change
    create_table :roles do |t|
      t.string :name,        null: false
      t.string :title,       null: false
      t.text   :description, null: false
      t.text   :the_role,    null: false

      t.timestamps
    end
  end
end
