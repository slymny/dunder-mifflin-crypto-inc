'use strict';

import { initLandingPage } from './pages/landingPage.js';

const loadApp = () => {
  
  initLandingPage();
  setInterval(() => {
    document.getElementById("global-info").innerHTML = '';
    document.getElementById('coins').innerHTML = '';
    document.getElementById("navbar-coins").innerHTML = '';
    
    initLandingPage();
  }, 5000); 
};

window.addEventListener('load', loadApp);
