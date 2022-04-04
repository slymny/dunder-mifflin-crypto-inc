'use strict';

import {GLOBAL_INFO_ID, API_BASE_URL, GLOBAL_INFO, ARRAY_OF_COIN_IDS, TICKERS, COINS, START_INDEX, END_INDEX, END_INDEX_NAVBAR, INPUT_FIELD, NAVBAR_COINS_ID} from '../constants.js';
import {createGlobalInfo, createCoinsTable} from '../views/landingView.js';
import {fetchData} from '../lib/fetchData.js';
import {moneyFormatter} from '../lib/moneyFormatter.js';
import {showSearchResults} from './searchPage.js';

export const initLandingPage = async () => {
  
  const globalInfo = document.getElementById(GLOBAL_INFO_ID);

  const globalResponse = await fetchData(`${API_BASE_URL}${GLOBAL_INFO}`);
  const globalData = createGlobalInfo(globalResponse);
  globalInfo.appendChild(globalData);

  const table = document.getElementById('coins');
  const coinsInfo = await Promise.all(
    ARRAY_OF_COIN_IDS.slice(START_INDEX, END_INDEX).map(async coin => {
      coin = await fetchData(`${API_BASE_URL}${TICKERS}${coin}`);
      return coin;
    }),
  );
  
  coinsInfo
    .sort((a, b) => a.rank - b.rank)
    .forEach(coin => {
      const coinRow = createCoinsTable(coin);
      table.appendChild(coinRow);

      coinRow.onclick = function () {
        openExplorerPage(coin);
      };
    });

  const navbarCoins = coinsInfo.slice(START_INDEX, END_INDEX_NAVBAR);
  
  const navbarCoinsDiv = document.getElementById(NAVBAR_COINS_ID);
  navbarCoins.forEach(coin => {
    const coinDiv = createNavbarCoinDiv(coin);
    coinDiv.onclick = function () {
      openExplorerPage(coin);
    };
    navbarCoinsDiv.appendChild(coinDiv);
  });

  const inputField = document.getElementById(INPUT_FIELD);
  inputField.addEventListener('keyup', showSearchResults);
};

export async function openExplorerPage(coin) {
  const response = await fetchData(`${API_BASE_URL}${COINS}${coin.id}`);
  window.open(response.links.explorer[0]);
}
// alternative: goes to static web page with the id of the coin

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
  if (change < 0) {
    coinDiv.classList.add('decreasing');
  } else if (change > 0) {
    coinDiv.classList.add('increasing');
  } else {
    coinDiv.classList.add('unchanged');
  }
  return coinDiv;
}

