/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/User');
require('./models/Campaign');
require('./models/Signature');
require('./models/Comment');
require('./models/WasteProvider');

require('./services/passport');

if (process.env.NODE_ENV === 'test') {
  const MongoInMemory = require('mongo-in-memory');

  var port = 8000;
  var mongoServerInstance = new MongoInMemory(port); //DEFAULT PORT is 27017

  mongoServerInstance.start((error, config) => {
    if (error) {
      console.error(error);
    } else {
      //callback when server has started successfully

      console.log('HOST ' + config.host);
      console.log('PORT ' + config.port);

      var mongouri = mongoServerInstance.getMongouri('myDatabaseName');
      mongoose.connect(mongouri);
    }
  });
} else {
  mongoose.connect(keys.mongoURI);
}

const app = express();

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/campaignRoutes')(app);
require('./routes/signatureRoutes')(app);
require('./routes/commentRoutes')(app);
require('./routes/wasteProviderRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
