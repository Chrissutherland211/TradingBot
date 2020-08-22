import React from 'react';
import Route from './src/routes';
import {DeviceEventEmitter } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import store from './src/store';
import {Provider as PaperProvider} from 'react-native-paper';
import PushNotificationAndroid from 'react-native-push-notification'


const App: () => React$Node = () => {
  async function checkApplicationPermission() {
    const authorizationStatus = await messaging().requestPermission();

    if (authorizationStatus === messaging.AuthorizationStatus.AUTHORIZED) {
      console.log('User has notification permissions enabled.');
    } else if (
      authorizationStatus === messaging.AuthorizationStatus.PROVISIONAL
    ) {
      console.log('User has provisional notification permissions.');
    } else {
      console.log('User has notification permissions disabled');
    }
  }

  React.useEffect(()=>{
    return (function() {
      // Register all the valid actions for notifications here and add the action handler for each action
      PushNotificationAndroid.registerNotificationActions(['Accept','Reject','Yes','No']);
      DeviceEventEmitter.addListener('notificationActionReceived', function(action){
        console.log ('Notification action received: ' + action);
        const info = JSON.parse(action.dataJSON);
        if (info.action == 'Accept') {
          // Do work pertaining to Accept action here
        } else if (info.action == 'Reject') {
          console.log('-------------')
          // Do work pertaining to Reject action here
        }
        // Add all the required actions handlers
      });
    })();
  },[])

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@TOKEN', value);
      console.log(value);
    } catch (e) {
      // error
    }
  };

  React.useEffect(()=>{
  //   PushNotificationAndroid.registerNotificationActions(['Accept','Reject','Yes','No']);
  // DeviceEventEmitter.addListener('notificationActionReceived', function(action){
  //   console.log ('Notification action received: ' + action);
  //   const info = JSON.parse(action.dataJSON);
  //   if (info.action == 'Accept') {
  //     // Do work pertaining to Accept action here
  //   } else if (info.action == 'No') {
  //     console.log()
  //     // Do work pertaining to Reject action here
  //   }
    // Add all the required actions handlers
  // });
  },[])

  messaging()
    .getToken()
    .then(async (token) => {
      storeData(token);
    });

  checkApplicationPermission();

  return (
    <Provider store={store}>
      <PaperProvider>
        <Route />
      </PaperProvider>
    </Provider>
  );
};

export default App;
