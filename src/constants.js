'use strict';

/*
 The constants file is used to store anything 
 that multiple files use, that should ALWAYS be the same
 
 It is an industry standard to make these variables fully capitalised
*/

export const USER_INTERFACE_ID = 'user-interface';
export const GLOBAL_INFO_ID = 'global-info';
export const COINS_ROW_ID = 'coins';
export const NAVBAR_COINS_ID = 'navbar-coins';
export const API_BASE_URL = 'https://api.coinpaprika.com/v1/';
export const GLOBAL_INFO = 'global';
export const TICKERS = 'tickers/';
export const COINS_LINK = 'https://coinpaprika.com/coin/';
export const ARRAY_OF_COIN_IDS = [
  'btc-bitcoin',
  'eth-ethereum',
  'usdt-tether',
  'bnb-binance-coin',
  'usdc-usd-coin',
  'doge-dogecoin',
  'busd-binance-usd',
  'hex-hex',
  'avax-avalanche'/*
  'shib-shiba-inu',
  'ada-cardano',
  'luna-terra',
  'xrp-xrp',
  'sol-solana',
  
  'dot-polkadot',
  'ust-terrausd',
  'matic-polygon',
   , "near-near-protocol", "steth-lido-staked-ether" */,
];
export const START_INDEX = 0;
export const END_INDEX = 9;
export const END_INDEX_NAVBAR = 5;
export const SEARCH_RESULTS_URL = 'https://api.coinpaprika.com/v1/search/?q=';
export const SEARCH_CURRENCIES_URL = '&c=currencies&limit=9';
export const INPUT_FIELD = 'input-field';

