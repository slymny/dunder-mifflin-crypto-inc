'use strict';

import {
  GLOBAL_INFO_ID,
  API_BASE_URL,
  GLOBAL_INFO,
  TICKERS,
  COINS_LINK,
  START_INDEX,
  END_INDEX_NAVBAR,
  INPUT_FIELD_CLASS,
  NAVBAR_COINS_ID,
  PERCENT_CHANGE_CLASS,
  PERCENT_CHANGE_GLOBAL_CLASS,
} from '../constants.js';
import {createGlobalInfo, createCoinsTable, changeColor} from '../views/landingView.js';
import {fetchData} from '../lib/fetchData.js';
import {moneyFormatter} from '../lib/moneyFormatter.js';
import {showSearchResults} from './searchPage.js';
import {createInfo} from '../lib/info.js';

// Landing page is initialize with this function
export const initLandingPage = async () => {
  // Variables starts with global creates the global info section
  const globalInfo = document.getElementById(GLOBAL_INFO_ID);
  const table = document.getElementById('coins');
  const navbarCoinsDiv = document.getElementById(NAVBAR_COINS_ID);

  try {
    const globalResponse = await fetchData(`${API_BASE_URL}${GLOBAL_INFO}`);
    const globalData = createGlobalInfo(globalResponse);
    globalInfo.appendChild(globalData);

    // To fill the table, the function takes the ids of the coins from local storage.
    const coinIds = JSON.parse(localStorage.getItem('coinIds'));
    
    // Fetching and storing of the coins in the coinsInfo array
    const coinsInfo = await Promise.all(
      coinIds.map(async coin => {
        coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
        return coin;
      }),
    );

    // Sorts the coins and creates row for each of the coin
    coinsInfo
      .sort((a, b) => a.rank - b.rank)
      .forEach(coin => {
        const coinRow = createCoinsTable(coin);
        table.appendChild(coinRow);

      // To explore more of the coin this event handler directs user to another web page
        coinRow.onclick = function () {
          openExplorerPage(coin);
        };
      });

    // Sets the color of the percentage values according to increase or decrease
    changeColor(`${PERCENT_CHANGE_CLASS}, ${PERCENT_CHANGE_GLOBAL_CLASS}`);

    // Creates navbar short information about popular coins
    const navbarCoins = coinsInfo.slice(START_INDEX, END_INDEX_NAVBAR);
    navbarCoins.forEach(coin => {
      const coinDiv = createNavbarCoinDiv(coin);
      coinDiv.onclick = function () {
        openExplorerPage(coin);
      };
      navbarCoinsDiv.appendChild(coinDiv);
    });

    // Listens every keyup event and if the page size is mobile it deletes the value of the navbar search field and vice versa.
    let searchTimeoutToken = 0;
    const inputFields = document.querySelectorAll(`.${INPUT_FIELD_CLASS}`);
    inputFields.forEach((input, i) =>
      input.addEventListener('keyup', () => {
        switch(i) {
          case 0:
            inputFields[1].value = '';
            break;
          case 1:
            inputFields[0].value = '';
        }
        clearTimeout(searchTimeoutToken);
        searchTimeoutToken = setTimeout(showSearchResults, 500);
      }),
    );
  } catch (error) {
    // This prints error message to screen
    createInfo('Oops... Something went wrong. Please try again.');
  }
};

// Opens detailed web page about the coin
export function openExplorerPage(coin) {
  window.open(`${COINS_LINK}${coin.id}`);
}

// Creates navbar short information for popular coins
function createNavbarCoinDiv(coin) {
  const coinDiv = document.createElement('div');
  coinDiv.className = 'navbar-coin';
  const coinSymbol = document.createElement('h3');
  const coinPrice = document.createElement('h3');
  coinSymbol.textContent = coin.symbol;
  const price = coin.quotes.USD.price;
  const change = coin.quotes.USD.percent_change_15m;
  coinPrice.textContent = moneyFormatter.format(price);
  coinDiv.append(coinSymbol, coinPrice);
  
  // change the color of the value according to increase and decrease
  if (change < 0) {
    coinDiv.classList.add('decreasing');
  } else if (change > 0) {
    coinDiv.classList.add('increasing');
  } else {
    coinDiv.classList.add('unchanged');
  }

  return coinDiv;
}
