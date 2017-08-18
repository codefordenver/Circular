FROM starefossen/ruby-node
RUN apt-get update -qq \
    && apt-get install -y build-essential libpq-dev
RUN mkdir /circular
WORKDIR /circular
ADD Gemfile /circular/Gemfile
ADD Gemfile.lock /circular/Gemfile.lock
RUN bundle install
ADD . /circular
RUN cd /circular/client \
    && npm install \
    && npm install npm-run-all
