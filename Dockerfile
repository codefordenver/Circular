FROM starefossen/ruby-node
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev
RUN mkdir /Circular
WORKDIR /Circular
ADD Gemfile /Circular/Gemfile
ADD Gemfile.lock /Circular/Gemfile.lock
RUN bundle install
ADD . /Circular
RUN cd client && npm install
RUN npm install npm-run-all
