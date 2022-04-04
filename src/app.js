'use strict';


import { initLandingPage } from './pages/landingPage.js';
import { COINS_ROW_ID, GLOBAL_INFO_ID, NAVBAR_COINS_ID, INPUT_FIELD } from './constants.js';

const loadApp = () => {
  initLandingPage();
  setInterval(() => {
    document.getElementById(GLOBAL_INFO_ID).innerHTML = '';
    document.getElementById(COINS_ROW_ID).innerHTML = '';
    document.getElementById(NAVBAR_COINS_ID).innerHTML = '';
    document.getElementById(INPUT_FIELD).value = '';
    
    initLandingPage()
  }, 30000);

  
};

document.cookie = "SameSite=Strict";

window.addEventListener('load', loadApp);
