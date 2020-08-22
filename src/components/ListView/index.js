import React, {Component, useEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Content, List, ListItem, Left, Body, Right, Button} from 'native-base';
import {LIMIT} from '../../utils';
import {Chip} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import PushNotification from 'react-native-push-notification';

function ListView(props) {
  const percent = useSelector((store)=>store.percent)
  PushNotification.configure({
    onRegister: function (token) {
      // console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
      // console.log("NOTIFICATION:", notification);
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });
  const setInit = () => {
    let temp = {};
    value.cryptoKind.map((i) => {
      temp = {...temp, [i]: false};
    });
    return temp;
  };
  const {item} = props;
  const [value, setValue] = React.useState(props.value);
  const [isTradeTime, setIsTradeTime] = React.useState(setInit());

  useEffect(() => {
    setValue(props.value);
    const maxValue = getMaxValue(value);
    
    let count = 0;
    Object.keys(value[item]).map((i) => {
      console.log((value[item][i] / maxValue) * 100);
      if ((value[item][i] / maxValue) * 100 > percent) {
        count++;
      }
    });
    if (count === Object.keys(value[item]).length) {
      setIsTradeTime({...isTradeTime, [item]: true});
      PushNotification.cancelAllLocalNotifications();
      testPush(item);
    } else {
      setIsTradeTime({...isTradeTime, [item]: false});
    }
    Object.keys(value[item]).map((i) => {});
  }, [props.value]);

  const getMaxValue = (value) => {
    let maxValue = value[item][Object.keys(value[item])[0]];
    Object.keys(value[item]).map((i) => {
      if (parseFloat(value[item][i]) > parseFloat(maxValue)) {
        maxValue = value[item][i];
      }
    });
    return maxValue;
  };

  const testPush = (item) => {
    PushNotification.localNotification({ 
      title: 'Great News',
      message: 'Please enter the Market',
      // playSound: true,
      // soundName: 'default',
      // actions: '["Yes", "No"]',
    });
  };

  // const MA_difference = Math.abs(ma_7 - ma_30);

  return (
    <View
      style={{
        marginBottom: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 5,
        borderColor: '#ddd',
        shadowOpacity: 0.75,
        shadowRadius: 2,
        shadowColor: 'black',
        shadowOffset: {height: 5, width: 0},
        paddingVertical: 10,
        elevation: 2,
      }}>
      <View
        style={{
          width: '10%',
          paddingHorizontal: 10,
        }}>
        <Icon name="staro" size={20}></Icon>
      </View>
      <View
        style={{
          width: '30%',
          paddingHorizontal: 10,
          display: 'flex',
          justifyContent: 'center',
        }}>
        <Text>{item}</Text>
      </View>
      <View
        style={{
          width: '70%',
          paddingHorizontal: 10,
        }}>
        {Object.keys(value[item]).map((i) => {
          return (
            <Chip
              icon="chart-line"
              style={
                isTradeTime[item]
                  ? {
                      width: '80%',
                      marginVertical: 3,
                      backgroundColor: 'green',
                    }
                  : {
                      width: '80%',
                      marginVertical: 3,
                      backgroundColor: '#ff6363',
                    }
              }>
              <Text style={{color: 'white'}}>
                {i}:{value[item][i]}
              </Text>
            </Chip>
          );
        })}
      </View>
    </View>
  );
}

export default ListView;
