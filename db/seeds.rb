# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Campaign.create!([
  { street_address: '710 E 26th Ave, Denver, CO 80205', lat: 39.7392, lng: -104.673828, name: 'Nuggets', vote_count: 4 },
  { street_address: '1435 Jersey St, Denver, CO 80220, USA', lat: 39.739163, lng: -104.920209, name: 'Rockies', vote_count: 3 },
  { street_address: 'Barnum West, Denver, CO, USA', lat: 39.721756, lng: -105.044840, name: 'Avalanche', vote_count: 7 },
  { street_address: 'Platt Park, Denver, CO 80210, USA', lat: 39.696614, lng: -104.982272, name: 'Cherry Creek', vote_count: 6 },
  { street_address: 'Kennedy, Denver, CO, USA', lat: 39.659113, lng: -104.865747, name: 'Ariel', vote_count: 9 },
  { street_address: 'Berkley, CO, USA', lat: 39.792355, lng: -105.016302, name: 'Berekely', vote_count: 2 },
  { street_address: 'Baker, Denver, CO, USA', lat: 39.712282, lng: -104.996709, name: 'Baker' },
  { street_address: 'Northfield, Denver, CO, USA', lat: 39.797109, lng: -104.902870, name: 'Northfield', vote_count: 5 },
  { street_address: 'Windsor, Denver, CO, USA', lat: 39.709109, lng: -104.889465, name: 'Windsor', vote_count: 10 },
  { street_address: 'Auraria, Denver, CO, USA', lat: 39.748008, lng: -105.006986, name: 'Pepsi', vote_count: 10 },
  { street_address: 'City Park, Denver, CO, USA', lat: 39.749858, lng: -104.946996, name: 'Monkey', vote_count: 11 },
  { street_address: '3870 Quebec St, Denver, CO 80207, USA', lat: 39.770741, lng: -104.901162, name: 'Stapleton', vote_count: 6 },
  { street_address: 'North Washington, CO, USA', lat: 39.793815, lng: -104.977670, name: 'North Washington', vote_count: 15 }
])