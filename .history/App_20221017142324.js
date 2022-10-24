import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './views/Home';
import LogIn from './views/LogIn';
import LogOut from './views/LogOut';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{title: 'Inicio de sesión'}}
        />
        <Stack.Screen name="LogIn" component={LogIn} />
        <Stack.Screen name="LogOut" component={LogOut} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
