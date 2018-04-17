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

if (process.env.NODE_ENV === 'dev') {
  console.log('PREPARING THE DEV ENVIRONMENT');
  mongoose.connect(keys.mongoURI);
} else if (process.env.NODE_ENV === 'staging') {
  console.log('PREPARING THE STAGING ENVIRONMENT');
  mongoose.connect(keys.mongoURI);
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
