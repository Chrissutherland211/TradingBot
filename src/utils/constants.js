export const API_URL = 'https://rest.coinapi.io/v1/ohlcv/BTC/USD';
export const SERVER_KEY = process.env.SERVER_KEY;
export const LIMIT = 99.95;
export const coinTypeLists = [
  'BTC-USDT',
  'LTC-USDT',
  'ETH-USDT',
  'ETC-USDT',
  'EOS-USDT',
  'XRP-USDT',
  'BCH-USDT',
];

export const timeLists = [
  {
    label: '1分',
    value: 0,
  },
  {
    label: '3分',
    value: 1,
  },
  {
    label: '15分',
    value: 3,
  },
  {
    label: '1时',
    value: 5,
  },
  {
    label: '6时',
    value: 8,
  },
  {
    label: '1日',
    value: 10,
  },
  {
    label: '1周',
    value: 11,
  },
];
