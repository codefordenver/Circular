if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod');
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./test');
} else {
  module.exports = require('./dev');
}
