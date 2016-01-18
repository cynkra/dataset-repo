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
    database: 'meta',
    featureFunction: {
      data: {
        user:     '',
        password: '',
        database: 'ctu_feature_data',
      },
      results: {
        user:     '',
        password: '',
        database: 'ctu_feature_func'
      },
      temp: {
        user:     '',
        password: '',
        database: 'ctu_feature_temp'
      }
    }
  },
  email: {
    auth: {
      host: 'relay.vpn',
      port: 25
    },
    recipient: 'Jan Motl <jan.motl@fit.cvut.cz>, Oliver Schulte <oschulte@cs.sfu.ca>'
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
