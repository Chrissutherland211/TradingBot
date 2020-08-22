import {get} from './base.js';
import axios from 'axios';
import {API_KEY} from '../utils';
import _ from 'lodash';

export const Currency = {
  getMthCurrency: ({period,instrument_id}) =>
    axios.post(
      `http://121.40.155.22`,
      {
        "timeIndex":period,
        "instrument_id":instrument_id,
 
      }
    ).then(({ data }) => data).catch(error=>{}),
  getWeekCurrency: () => axios.get(
    'https://rest.coinapi.io/v1/ohlcv/BITSTAMP_SPOT_BTC_USD/latest?period_id=7DAY',
    {headers: {
      'X-CoinAPI-Key': _.sample(API_KEY),          
    }}
  ).then(({ data }) => data),
  getDayCurrency: () => axios.get(
    'https://rest.coinapi.io/v1/ohlcv/BTC/USD/latest?period_id=1HRS',
    {headers: {
      'X-CoinAPI-Key': _.sample(API_KEY),          
    }}
  ).then(({ data }) => data),
};
