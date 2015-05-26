import React from 'react';
import router from './router';
import trackPageView from './common/trackPageView';

const app = document.getElementById('app');

if (process.env.NODE_ENV !== 'production') {
  require('react-a11y')();
}

router.run((Handler, state) => {
  React.render(<Handler />, app);
  trackPageView(state);
});
