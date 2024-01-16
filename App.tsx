/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './src/Types/index';
import {Provider} from 'react-redux';
import Store from './src/Redux/Store';
import Home from './src/Views/Home';
import Albums from './src/Views/Albums';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator<RootStackParamList>();
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerTitle: 'Users',
            }}
          />
          <Stack.Screen
            name="Albums"
            component={Albums}
            options={{
              headerTitle: 'Albums',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
