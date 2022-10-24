import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './views/Home';
import LogIn from './views/LogIn';
import LogOut from './views/LogOut';
import linking from './linking.js';

const Stack = createNativeStackNavigator();

export const AuthStateGlobalContext = React.createContext();

const App = () => {
  return (
    <NavigationContainer linking={linking}>
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
  <AuthStateGlobalContext value=""></AuthStateGlobalContext>;
};

export default App;
