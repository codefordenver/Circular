if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'dev') {
  module.exports = require('./dev');
} else {
  module.exports = require('./staging');
}
