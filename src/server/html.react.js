import PureComponent from '../client/common/purecomponent.react';
import React from 'react';
import config from './config';

export default class Html extends PureComponent {

  render() {
    const version = require('../../package').version;
    // Only for production. For dev, it's handled by webpack with livereload.
    const linkStyles = config.isProduction &&
      <link
        href={`/build/app.css?v=${version}`}
        rel="stylesheet"
      />;

    const appHtml = `<div id="app">${this.props.appHtml}</div>`;

    const appScriptSrc = config.isProduction
    ? '/build/app.js?v=' + version
    : '//localhost:8888/build/app.js';

    let scriptHtml = `
    <script>
      (function() {
        window._appState = ${JSON.stringify(this.props.appState)};
        var app = document.createElement('script');
          app.type = 'text/javascript';
          app.async = true;
          app.src = '${appScriptSrc}';
        var s = document.getElementsByTagName('script')[0];
          s.parentNode.insertBefore(app, s);
      })();
    </script>`;

    if (config.isProduction && config.googleAnalyticsId !== 'UA-XXXXXXX-X') {
      scriptHtml += `
        <script>
          (function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
          function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
          e=o.createElement(i);r=o.getElementsByTagName(i)[0];
          e.src='//www.google-analytics.com/analytics.js';
          r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
          ga('create','${config.googleAnalyticsId}');ga('send','pageview');
        </script>`;
    }

    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport" />
          <title>{this.props.title}</title>
          {linkStyles}
        </head>
        <body dangerouslySetInnerHTML={{__html: appHtml + scriptHtml}} />
      </html>
    );
  }

}

Html.propTypes = {
  appHtml: React.PropTypes.string.isRequired,
  appState: React.PropTypes.object.isRequired,
  title: React.PropTypes.string.isRequired
};
