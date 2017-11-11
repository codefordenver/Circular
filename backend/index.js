const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
const cors = require('cors');
require('./models/User');
require('./models/Campaign');
require('./models/Signature');

require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

app.use(cors());
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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));

	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);

//clientId: 45736087042-kdq1atpud65dca2a44hmtpadura3qcfa.apps.googleusercontent.com
//client secret: Zl0Y0r6ISoesuby7aLshgTx5
