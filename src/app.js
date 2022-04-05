'use strict';

import { initLandingPage } from './pages/landingPage.js';

const loadApp = () => {
  initLandingPage(); 
};

window.addEventListener('load', loadApp);
