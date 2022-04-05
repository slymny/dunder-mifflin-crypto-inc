'use strict';

import {ARRAY_OF_COIN_IDS, COINS_ROW_ID, SEARCH_RESULTS_URL, SEARCH_CURRENCIES_URL, API_BASE_URL, TICKERS, INPUT_FIELD} from '../constants.js';
import {createCoinsTable} from '../views/landingView.js';
import {fetchData} from '../lib/fetchData.js';
import {openExplorerPage} from './landingPage.js';

export const showSearchResults = async e => {
  document.getElementById(COINS_ROW_ID).innerHTML = '';

  const searchString = document.getElementById(INPUT_FIELD).value.toLowerCase();

  try {
    if (!searchString) {
      const popCoins = await Promise.all(
        ARRAY_OF_COIN_IDS.map(async coin => {
          coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
          return coin;
        }),
      );
      createTable(popCoins);
    } else {
      const searchResultsIds = [];
      const results = await fetchData(`${SEARCH_RESULTS_URL}${searchString}${SEARCH_CURRENCIES_URL}`);
      results.currencies.forEach(result => searchResultsIds.push(result.id));

      const coinsInfo = await Promise.all(
        searchResultsIds.map(async coin => {
          coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
          return coin;
        }),
      );

      if (coinsInfo.length > 0) {
        createTable(coinsInfo);
      } else {
          createInfo('Oops... There is no such coin. Please try again.') 
      }
    }
  } catch (err) {
    console.error(err);

  }
};

function createTable(coins) {
  const table = document.getElementById('coins');
  coins.forEach(coin => {
    const coinRow = createCoinsTable(coin);
    table.appendChild(coinRow);

    coinRow.onclick = function () {
      openExplorerPage(coin);
    };
  });
}

function createInfo(msg) {
    const createdData = document.createElement('div');
    createdData.textContent = msg;
    createdData.className = 'info';
    
    document.body.appendChild(createdData);
    setTimeout(() => createdData.remove(), 5000);
  }
