if (!process.env.NODE_ENV)
	throw new Error('Enviroment variable NODE_ENV must be set.');

require('babel/register');

var config = require('./config');

// Ignore webpack custom loaders on server.
config.webpackStylesExtensions.forEach(function(ext) {
  require.extensions['.' + ext] = function() {}
});

require('./main');
