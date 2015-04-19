module.exports = {
  api: {
    url: '/api'
  },
  database: {
    host:     'relational.fit.cvut.cz',
    user:     'guest',
    password: '******',
    database: 'meta'
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
