# Circular [![Stories in Ready](https://badge.waffle.io/codefordenver/Circular.png?label=ready&title=Ready)](https://waffle.io/codefordenver/Circular)

Circular provides a platform for tenants of multi-family buildings within the City of Denver to transparently and collectively petition their landlord to add recycling and compost collection services through an automated and highly efficient process.

## Getting Started

### Prerequisites & Installation

In order to get the project up and running on your local machine, you will first need to install a few software tools and copy the project source code on to your local machine.

#### 1. Install Ruby
Follow the instructions in the link install Ruby:
[Quick Guide for Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/)

(Don't hesitate to ask for help if needed!)

#### 2. Install Rails
Follow the instructions in the link to install Rails: [Quick Guide for Installing Rails](http://guides.rubyonrails.org/getting_started.html<Paste>)


#### 3. Install PostgreSQL

If you have Homebrew, use the following command to install PostgreSQL.

```
$ brew install postgres
$ pg_ctl -D <var folder> start
```
Otherwise, you can download the software [here](https://www.postgresql.org/download/).

#### 4. Clone Project Source Code from GitHub

The GitHub repository for this project is located at https://github.com/codefordenver/Circular. Run the command below to clone the source code on to your local machine.

```
$ git clone https://github.com/codefordenver/Circular.git
```

#### 5. Install Rails App and Dependencies

Use the command below to make sure all dependencies in your Gemfile are available to the application.

```
$ bundle install
```

#### 6. Create and Initialize the Database

```
$ rails db:create
$ rails db:migrate
```

#### 7. Run the App

Finally, run the app using the `rails s` (short for `rails server`). This will
allow you to access the application through a web browser. After starting the server, open http://localhost:3000 in order to see the Rails app run in your favorite browser.

```
$ rails s
```

#### Optional: Run the App Console

`rails c` is short for `rails console` and allows you to interact with the application straight from the command line. This is helpful for checking what data is in the database, among other things.

```
$ rails c
```

## Running the Test Suite

This project employs RSpec (specifically, the rspec-rails library) to test the code. You can learn more about RSpec [here](https://relishapp.com/rspec/docs/gettingstarted).

In order to run the test suite, use the commands below. `rails db:test:prepare` will ensure that both your test database is up-to-date with development. `rspec` will run the test suite.

```
$ rails db:test:prepare
$ rspec
```
