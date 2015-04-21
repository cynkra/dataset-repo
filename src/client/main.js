import React from 'react';
import router from './router';

const app = document.getElementById('app');

if (process.env.NODE_ENV !== 'production') {
  require('react-a11y')();
}

router.run((Handler) => {
  React.render(<Handler />, app);
});
