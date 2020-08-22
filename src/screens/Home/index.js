import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Container, Content} from 'native-base';
import BackgroundTimer from 'react-native-background-timer';
// import messaging from '@react-native-firebase/messaging';
import AwesomeAlert from 'react-native-awesome-alerts';
import moment from 'moment';
import notifee from '@notifee/react-native';
import Header from '../../components/Header';
import ListView from '../../components/ListView';
import {LIMIT, timeLists, coinTypeLists} from '../../utils';
import {setCoinOption, fetchCoinData} from '../../store/action';
import {connect, useSelector} from 'react-redux';
import {Chip} from 'react-native-paper';
import _ from 'lodash';
import BackgroundFetch from 'react-native-background-fetch';

function Home(props) {
  let t = null;
  const [values, setValues] = useState(props.coinData);

  useEffect(() => {
    setValues(props.coinData);
  }, [props.coinData]);
  React.useEffect(() => {
    coinTypeLists.map((item) => {
      if (values.cryptoKind.includes(item)) {
        props.fetchCoinData(
          {
            period: values.period,
            instrument_id: item,
          },
          values.mas,
          item,
        );
      }
    });
    let interval = setInterval(() => {
      console.log('----------------');
      coinTypeLists.map((item) => {
        if (values.cryptoKind.includes(item)) {
          props.fetchCoinData(
            {
              period: values.period,
              instrument_id: item,
            },
            values.mas,
            item,
          );
        }
      });
    }, 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        forceAlarmManager: false,
        stopOnTerminate: false,
        startOnBoot: true,
        requiredNetworkType: BackgroundFetch.NETWORK_TYPE_NONE,
        requiresCharging: false,
        requiresDeviceIdle: false,
        requiresBatteryNotLow: false,
        requiresStorageNotLow: false,
      },
      async (taskId) => {
        console.log('---------Background Mode-----------');
        coinTypeLists.map((item) => {
          if (values.cryptoKind.includes(item)) {
            props.fetchCoinData(
              {
                period: values.period,
                instrument_id: item,
              },
              values.mas,
              item,
            );
          }
        });

        BackgroundFetch.finish(taskId);
      },
      (error) => {
        console.log('[js] RNBackgroundFetch failed to start');
      },
    );
    BackgroundFetch.status((status) => {
      switch (status) {
        case BackgroundFetch.STATUS_RESTRICTED:
          console.log('BackgroundFetch restricted');
          break;
        case BackgroundFetch.STATUS_DENIED:
          console.log('BackgroundFetch denied');
          break;
        case BackgroundFetch.STATUS_AVAILABLE:
          console.log('BackgroundFetch is enabled');
          break;
      }
    });
  }, []);

  return (
    <>
      <Container>
        <Header />
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <Chip icon="timer" style={{width: '25%', margin: 5}}>
            {values && _.find(timeLists, ['value', values.period]).label}
          </Chip>
          <Chip icon="percent" style={{width: '29%', margin: 5}}>
            {`${props.coinData.percent}% 多于`}
          </Chip>
        </View>
        <Content>
          {values.cryptoKind.map((item) => {
            return <ListView item={item} key={item.id} value={values} />;
          })}
        </Content>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
  coinData: state,
});


const mapDispatchToProps = {
  fetchCoinData,
  setCoinOption,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
