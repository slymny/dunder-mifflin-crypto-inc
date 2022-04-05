'use strict';

import {ARRAY_OF_COIN_IDS, COINS_ROW_ID, SEARCH_RESULTS_URL, SEARCH_CURRENCIES_URL, API_BASE_URL, TICKERS, INPUT_FIELD_CLASS, PERCENT_CHANGE_CLASS, PERCENT_CHANGE_GLOBAL_CLASS} from '../constants.js';
import {createCoinsTable, changeColor} from '../views/landingView.js';
import {fetchData} from '../lib/fetchData.js';
import {createInfo} from '../lib/info.js';
import {openExplorerPage} from './landingPage.js';

export const showSearchResults = async () => {
  document.getElementById(COINS_ROW_ID).innerHTML = '';

  let searchString = '';
  const [inputDesktop, inputMobile] = document.querySelectorAll(`.${INPUT_FIELD_CLASS}`);
  if (inputMobile.value) {
    searchString = inputMobile.value.toLowerCase();
  } else {
    searchString = inputDesktop.value.toLowerCase();
  }

  try {
    if (!searchString) {
      localStorage.setItem('coinIds', JSON.stringify(ARRAY_OF_COIN_IDS));

      const popularCoins = await Promise.all(
        ARRAY_OF_COIN_IDS.map(async coin => {
          coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
          return coin;
        }),
      );
      createTable(popularCoins);
      changeColor(`${PERCENT_CHANGE_CLASS}, ${PERCENT_CHANGE_GLOBAL_CLASS}`);
    } else {
      const searchResultsIds = [];
      const results = await fetchData(`${SEARCH_RESULTS_URL}${searchString}${SEARCH_CURRENCIES_URL}`);
      results.currencies.forEach(result => searchResultsIds.push(result.id));

      localStorage.setItem('coinIds', JSON.stringify(searchResultsIds));

      const coinsInfo = await Promise.all(
        searchResultsIds.map(async coin => {
          coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
          return coin;
        }),
      );
      console.log(coinsInfo);
      if (coinsInfo.length > 0) {
        createTable(coinsInfo);
        changeColor(`${PERCENT_CHANGE_CLASS}, ${PERCENT_CHANGE_GLOBAL_CLASS}`);
      } else {
        createInfo('Oops... There is no such coin. Please try again.');
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
