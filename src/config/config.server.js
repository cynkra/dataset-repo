var _ = require('underscore');
var localConfig = require('./config.server.local');

var config = {
  api: {
    url: '/api/v1'
  },
  database: {
    client:   'mysql',
    host:     'relational.fit.cvut.cz',
    user:     'guest',
    password: 'relational',
    database: 'meta'
  },
  email: {
    auth: {
      host: 'relay.vpn',
      port: 25,
      secure: true,
      auth: {
        user: '',
        pass: ''
      }
    },
    recipient: 'jan.motl@fit.cvut.cz'
  },
  googleAnalyticsId: 'UA-61229872-1',
  isProduction: process.env.NODE_ENV === 'production',
  piping: {
    ignore: /(\/\.|~$|\.(css|less|sass|scss|styl))/,
    hook: true
  },
  port: process.env.PORT || 8000,
  webpackStylesExtensions: ['css', 'less', 'sass', 'scss', 'styl']
};

module.exports = _.extend(config, localConfig);
