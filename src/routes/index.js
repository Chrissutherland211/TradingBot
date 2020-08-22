import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import Option from '../screens/Option';
import TimeOption from '../screens/TimeOption';
import MAOption from '../screens/MAOption';
import CoinTypeOption from '../screens/CoinTypeOption';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Option"
          component={Option}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="TimeOption"
          component={TimeOption}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MAOption"
          component={MAOption}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CoinTypeOption"
          component={CoinTypeOption}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;
