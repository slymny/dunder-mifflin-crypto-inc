'use strict';

import { USER_INTERFACE_ID, GLOBAL_INFO_ID, API_BASE_URL, GLOBAL_INFO, ARRAY_OF_COIN_IDS, TICKERS } from '../constants.js';
import { createGlobalInfo, createCoinsTable } from '../views/landingView.js';
import { initChartPage } from './questionPage.js';
import { fetchData } from '../lib/fetchData.js';

export const initLandingPage = async () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  const globalInfo = document.getElementById(GLOBAL_INFO_ID);
  //userInterface.innerHTML = '';

  const globalResponse = await fetchData(`${API_BASE_URL}${GLOBAL_INFO}`);
  //console.log(globalResponse);
  const globalData = createGlobalInfo(globalResponse);
  globalInfo.appendChild(globalData);

  const table = document.getElementById('coins');
  const coinsInfo = await Promise.all(ARRAY_OF_COIN_IDS.map(async coin => {
    coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
    //const coinNavbar
    return coin;
  }));
  console.log(coinsInfo);
  coinsInfo.forEach(coin => {
    const coinRow = createCoinsTable(coin)
    table.appendChild(coinRow);
  });

};

const startQuiz = () => {
  initChartPage();
};
