# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Creates Root Admin user
# ADMIN
puts 'Inserting AdminUser...'.colorize(:green)
  User.create name: 'Root Admin', email: 'root@admin.com', password: '123123'
puts '...AdminUser inserted.'.colorize(:light_blue)
# /ADMIN

# ROLES
puts 'Inserting Roles...'.colorize(:green)
  Role.create name: 'moderator', title: 'Role for UN Users', description: 'This user might be an official UN employee',
              the_role: '{"system":{"administrator":false},"admin_roles":{"index":false}}'
  Role.create name: 'user', title: 'Role for General Users', description: 'This user can be anyone that wants to apply',
              the_role: '{"system":{"administrator":false},"admin_roles":{"index":false}}'
puts '...Roles inserted.'.colorize(:light_blue)
# /ROLES