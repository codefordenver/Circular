# Circular [![Stories in Ready](https://badge.waffle.io/codefordenver/Circular.png?label=ready&title=Ready)](https://waffle.io/codefordenver/Circular)

Circular provides a platform for tenants of multi-family buildings within the City of Denver to transparently and collectively petition their landlord to add recycling and compost collection services through an automated and highly efficient process.

## Getting Started

### Prerequisites & Installation

In order to get the project up and running on your local machine, you will first need to install a few software tools and copy the project source code on to your local machine.

FOR WINDOWS! Use this guide for Ruby, Rails, node, and Github: http://installfest.railsbridge.org/installfest/windows

#### 1. Install Ruby
Follow the instructions in the link install Ruby:
[Quick Guide for Installing Ruby](https://www.ruby-lang.org/en/documentation/installation/)

(Don't hesitate to ask for help if needed!)

#### 2. Install Rails
Follow the instructions in the link to install Rails: [Quick Guide for Installing Rails](http://guides.rubyonrails.org/getting_started.html)


#### 3. Install PostgreSQL

If you have Homebrew, use the following command to install PostgreSQL.

```
$ brew install postgres
$ pg_ctl -D <var folder> start
```

If you happen to stop your brew installed postgres server by accident or for whatever reason, you can always restart it using `pg_ctl -D /usr/local/var/postgres -l /usr/local/var/postgres/server.log start`.
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

#### 7. Install node

This includes a download of `npm`'s command line tools, which we'll use for managing frontend javascript modules. This only needs to be done once.

```
$ brew install node
```

#### 8. Navigate into the React app

From the root of the repository:

```
cd client
```

#### 9. Install the project's node modules

This only needs to be done the first time you run the app, or if you pull down the app and someone else has added modules since your last pull. From _inside the `client` directory_:

```
npm install
```


#### 10. Run the App

Finally, navigate _back to the root_ with `cd ..` and then run the `rake start` command. This alias will start 2 servers: React's Node server on port 3000, and Rails' Puma server on port 3001. (The Node server is then proxied to port 3001 to avoid CORS issues). The app will open in a new window/tab automagically! However, if you need to access the app in a different browser window/tab, simply point the browser to `http://localhost:3000/`.

```
cd ..
```

```
$ rake start
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
## Running with Docker

![Docker Logo](https://www.docker.com/sites/default/files/mono_horizontal_large.png)

###What is Docker?
Docker is a software platform that allows you to develop and run your software in *__containers__*. 

*__Containers__* are isolated environments in which you can install and run your software along with any libraries and denpendcies your software needs without the bloat that comes with running a full operating system like you normally would within a Virtual Machine. You can learn more about Docker *__containers__* [here](https://www.docker.com/what-container).

One advantage to running your software in *__containers__* is that you can standardize your development environment and eliminate problems that may arise out of having a unique development environment or working with other developers that may also have unique development environments.


###Why Docker?
Code for Denver is using Docker in an effort to reduce time spent onboarding new members onto new projects. By using Docker, we can take advantage of a standardized development environment shared by everyone working on a project and spend less time installing new software and setting up projects on everyone's unique machines. Every project repository contains a Dockerfile specific to that project that will configure and run the project within Docker containers - all you need to do to get started with a project is install Docker and follow the instructions below!