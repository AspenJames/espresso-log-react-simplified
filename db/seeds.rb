# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
c = CoffeeShop.create(:name => "Cafe Code", :address => "111 Programmer Ave", :email => "code@cafe.com", :password => "password")

guatemala = c.origins.build(:name => "Guatemala La Bolsa")
ethiopia = c.origins.build(:name => "Ethiopia Guji")

guatemala.espressos.build(:dose => 18, :yield => 35, :time => 28, :days_off_roast => 7, :notes => "Cocoa, chocolate-covered orange")
guatemala.espressos.build(:dose => 19, :yield => 32, :time => 30, :days_off_roast => 8, :notes => "Dense, dark chocolate syrup")
guatemala.espressos.build(:dose => 19, :yield => 38, :time => 28, :days_off_roast => 8, :notes => "Body very light, but sweet and clean")
guatemala.espressos.build(:dose => 18, :yield => 34, :time => 26, :days_off_roast => 4, :notes => "A bit fresh, very citrusy")
guatemala.espressos.build(:dose => 18, :yield => 32, :time => 28, :days_off_roast => 5, :notes => "Settling in nicely")

ethiopia.espressos.build(:dose => 18 , :yield => 40, :time => 28, :days_off_roast => 4, :notes => "Juicy peach, slight floral notes")
ethiopia.espressos.build(:dose => 18, :yield => 32, :time => 32, :days_off_roast => 5, :notes => "Intense, not balanced at all")
ethiopia.espressos.build(:dose => 18, :yield => 38, :time => 30, :days_off_roast => 6, :notes => "Soft, clean, stone fruit")
ethiopia.espressos.build(:dose => 18, :yield => 35, :time => 27, :days_off_roast => 7, :notes => "Bright, lemony, creamy body")

c.save