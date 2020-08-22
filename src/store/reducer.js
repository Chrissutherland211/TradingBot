import * as TYPES from './actionType';
import {createReducer} from 'redux-create-reducer';

const initialState = {
  period: 3,
  cryptoKind: [
    'BTC-USDT',
    'LTC-USDT',
    'ETH-USDT',
    'ETC-USDT',
    'EOS-USDT',
    'XRP-USDT',
    'BCH-USDT',
  ],
  mas: {MA1: '', MA2: '', MA3: '', MA4: '', MA5: ''},
  'BTC-USDT': {},
  'LTC-USDT': {},
  'ETH-USDT': {},
  'ETC-USDT': {},
  'EOS-USDT': {},
  'XRP-USDT': {},
  'BCH-USDT': {},
  percent: '99.95',
};

const Reducer = createReducer(initialState, {
  [TYPES.COIN_DATA]: (state, action) => {
    return {
      ...state,
      ...action.data,
    };
  },
  [TYPES.SET_MA]: (state, action) => {
    return {
      ...state,
      mas: [{MA20: '20'}],
    };
  },
});

export default Reducer;
