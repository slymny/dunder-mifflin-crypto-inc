'use strict';


import { initLandingPage } from './pages/landingPage.js';
import { COINS_ROW_ID, GLOBAL_INFO_ID, NAVBAR_COINS_ID } from './constants.js';

const loadApp = () => {
  initLandingPage();
  setInterval(() => {
    document.getElementById(GLOBAL_INFO_ID).innerHTML = '';
    document.getElementById(COINS_ROW_ID).innerHTML = '';
    document.getElementById(NAVBAR_COINS_ID).innerHTML = '';

    initLandingPage()
  }, 30000); 
};

window.addEventListener('load', loadApp);
