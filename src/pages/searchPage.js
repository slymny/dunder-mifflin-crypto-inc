'use strict';

import {COINS_ROW_ID, SEARCH_RESULTS_URL, SEARCH_CURRENCIES_URL, API_BASE_URL, TICKERS, INPUT_FIELD} from '../constants.js';
import {createCoinsTable} from '../views/landingView.js';
import {fetchData} from '../lib/fetchData.js';
import {openExplorerPage} from './landingPage.js';

export const showSearchResults = async e => {
  document.getElementById(COINS_ROW_ID).innerHTML = '';

  const searchString = document.getElementById(INPUT_FIELD).value.toLowerCase();
  if(!searchString) return;

  try {
    const searchResultsIds = [];
    const results = await fetchData(`${SEARCH_RESULTS_URL}${searchString}${SEARCH_CURRENCIES_URL}`);
    results.currencies.forEach(result => searchResultsIds.push(result.id));

    const table = document.getElementById('coins');
    const coinsInfo = await Promise.all(
      searchResultsIds.map(async coin => {
        coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
        return coin;
      }),
    );

    if (coinsInfo.length > 0) {
      coinsInfo.forEach(coin => {
        const coinRow = createCoinsTable(coin);
        table.appendChild(coinRow);

        coinRow.onclick = function () {
          openExplorerPage(coin);
        };
      });
    } else {
        
    }
  } catch (err) {
    console.error(err);
  }
};
