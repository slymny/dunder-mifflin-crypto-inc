'use strict';

import {moneyFormatter} from '../lib/moneyFormatter.js'

/**
 * Create the welcome screen
 * @returns {Element}
 */
export const createGlobalInfo = (props) => {
  const element = document.createElement('div');
  element.className = 'global-info-element';
  element.innerHTML = String.raw`
    <p>
    <span class="glb-value-name">Market Cap: </span>${moneyFormatter.format(props.market_cap_usd)}    
    <span class="glb-value-name">Volume 24h: </span><span class="global-change">${props.volume_24h_change_24h}</span>
    <span class="glb-value-name">Market Cap: </span><span class="global-change">${props.market_cap_change_24h}</span>  
    <span class="glb-value-name">Market Cap ATH Value: </span>${moneyFormatter.format(props.market_cap_ath_value)}  
    <span class="glb-value-name">Bitcoin Dominance: </span>${props.bitcoin_dominance_percentage}</p>`
    
  return element;
};


export const createCoinsTable = (props) => {
  const element = document.createElement('tr');
  element.className = 'coin-row';
  
  const {name, id, symbol, rank, last_updated, quotes:{USD:{price, market_cap, volume_24h, percent_change_15m, percent_change_6h, percent_change_12h, percent_change_24h, percent_change_7d, percent_change_30d, ath_price}}} = props;
  const updateDate = new Date(last_updated);
  const updateTime = updateDate.toLocaleTimeString();



  element.innerHTML = String.raw`
      <td class="disappear-xsm">${rank}</td>
      <td class="disappear-xsm"><img class="coin-logo" src="https://static.coinpaprika.com/coin/${id}/logo.png?rev=10557311">${symbol}</td>
      <td>${name}</td>
      <td>${moneyFormatter.format(price)}</td>
      <td class="disappear-sm">${moneyFormatter.format(ath_price)}</td>
      <td class="disappear-sm disappear-mid">${moneyFormatter.format(market_cap)}</td>
      <td class="disappear-sm disappear-mid">${moneyFormatter.format(volume_24h)}</td>
      <td class="change">${percent_change_15m}</td>
      <td class="change disappear-xsm">${percent_change_6h}</td>
      <td class="change">${percent_change_12h}</td>
      <td class="change">${percent_change_24h}</td>
      <td class="change">${percent_change_7d}</td>
      <td class="change disappear-mid">${percent_change_30d}</td>
      <td class="disappear-sm disappear-mid">${updateTime}</td>
      <td class="disappear-sm"><img src="https://graphs.coinpaprika.com/currency/chart/${id}/7d/chart.svg"></td>`

    
    return element;
} 

export function changeColor(classNames) {
  document.querySelectorAll(classNames).forEach(elem => {
    if(Number(elem.innerText) < 0) {
      elem.classList.add('decreasing');
    } else if(Number(elem.innerText) > 0) {
      elem.classList.add('increasing');
    }
  });
}

