# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170716003140) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "cube"
  enable_extension "earthdistance"

  create_table "apartments", force: :cascade do |t|
    t.string   "street_address"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
    t.float    "lng"
    t.float    "lat"
  end

  create_table "petitions", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "vote_count",   default: 1
    t.integer  "apartment_id"
    t.index ["apartment_id"], name: "index_petitions_on_apartment_id", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.string   "oauth_token"
    t.datetime "oauth_expires_at"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_foreign_key "petitions", "apartments"
end
