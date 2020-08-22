import * as TYPES from './actionType';
import {Currency} from '../API';

const setCoinData = (data) => {
  return {
    type: TYPES.COIN_DATA,
    data: data,
  };
};

const getMAs = (data, mas, coinType) => {
  let temp = [];
  let maTemp = {};
  Object.keys(mas).map((item) => {
    if (mas[item] !== '') {
      temp.push(mas[item]);
    }
  });
  // console.log(temp);
  let ma = 0;
  data.map((item, index) => {
    ma += parseFloat(item[4]);
    temp.map((i) => {
      if (index === parseInt(i) - 1) {
        let coinMa = ma / parseInt(i);
        coinMa = Math.floor(coinMa * 100) / 100;
        let key = `MA(${i})`;
        maTemp = {...maTemp, [key]: coinMa};
      }
    });
  });
  return {[coinType]: maTemp};
};

export const fetchCoinData = (data, mas, coinType) => {
  return async (dispatch) => {
    try {
      await Currency.getMthCurrency(data).then((data) => {
        dispatch(setCoinData(getMAs(data, mas, coinType)));
      });
    } catch (e) {}
  };
};

export const setCoinOption = (dispatch, data) => {
  return dispatch(setCoinData(data));
};
