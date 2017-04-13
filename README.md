# Circular

[![Stories in Ready](https://badge.waffle.io/codefordenver/Circular.png?label=ready&title=Ready)](https://waffle.io/codefordenver/Circular)

## Install Ruby/Rails

[Quick Guide for Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/)
[Quick Guide for Installing Rails](http://guides.rubyonrails.org/getting_started.html<Paste>)

(Ask for help if needed.)

## Install Postgres

(Use homebrew if you have it.)

```
brew install postgres

pg_ctl -D <var folder> start
```

## Clone source code

```
https://github.com/codefordenver/Circular

git clone https://github.com/codefordenver/Circular.git
```

## Install rails app and dependencies

```
bundle install
```

## Database creation/Database initialization

```
rails db:create
rails db:migrate
```

## Run the app

```
rails s
```

## Run the app console

```
rails c
```

## How to run the test suite

```
rails db:test:prepare
rspec
```

