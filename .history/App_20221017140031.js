import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Text>Prueba</Text>
    <Home/>;
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //     <Stack.Screen
    //       name="Home"
    //       component={Home}
    //       options={{title: 'Inicio de sesión'}}
    //     />
    //     {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
};

export default App;
