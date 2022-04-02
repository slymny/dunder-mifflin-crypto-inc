'use strict';

//import { START_QUIZ_BUTTON_ID } from '../constants.js';

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createGlobalInfo = (props) => {
  const element = document.createElement('div');
  element.innerHTML = String.raw`
    <h1>Global CryptoCurrency Market Info</h1>
    <p><span class="glb-value-name">Market Cap:</span>${props.market_cap_usd} 
    <span class="glb-value-name">Volume 24h:</span>${props.volume_24h_change_24h}
    <span class="glb-value-name">Market Cap:</span>${props.market_cap_change_24h}
    <span class="glb-value-name">Market Cap ATH Value:</span>${props.market_cap_ath_value}
    <span class="glb-value-name">Bitcoin Dominance:</span>${props.bitcoin_dominance_percentage}
    <span class="glb-value-name">Last Update at:</span>${props.last_updated}</p>`
  return element;
};


export const createCoinsTable = (props) => {
  const element = document.createElement('tr');
  const {name, symbol, rank, quotes:{USD:{price, market_cap, volume_24h, percent_change_30m, percent_change_1h, percent_change_6h, percent_change_12h, percent_change_24h, percent_change_7d, percent_change_30d, percent_change_1y, ath_price, percent_from_price_ath}}} = props;
  element.innerHTML = String.raw`
      <td>${name}</td>
      <td>${symbol}</td>
      <td>${rank}</td>
      <td>${price}</td>
      <td>${market_cap}</td>
      <td>${volume_24h}</td>
      <td>${percent_change_30m}</td>
      <td>${percent_change_1h}</td>
      <td>${percent_change_6h}</td>
      <td>${percent_change_12h}</td>
      <td>${percent_change_24h}</td>
      <td>${percent_change_7d}</td>
      <td>${percent_change_30d}</td>
      <td>${percent_change_1y}</td>
      <td>${ath_price}</td>
      <td>${percent_from_price_ath}</td>`
    

    return element;
} 


