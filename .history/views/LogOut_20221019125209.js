import React, {useState} from 'react';
import {
  Text,
  View,
  LogOutStylesheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {authorize, refresh} from 'react-native-app-auth';
import logo from '../assets/logo.png';
import fondo from '../assets/fondo.png';
import slogan from '../assets/slogan.png';
import LogOutStyles from '../styles/logOutStyle.js';
import linking from './linking.js';

const LogOut = ({navigation}) => {
  //Función asíncrona para volver al home - Sin configurar
  async function backToHome() {
    navigation.navigate('Home');
    Linking.openURL('');
  }
  return (
    <View style={LogOutStyles.container}>
      <ImageBackground
        source={fondo}
        resizeMode="cover"
        style={LogOutStyles.fondo}>
        <ScrollView>
          <View style={LogOutStyles.container}>
            {/* <Image source={slogan} style={LogOutStyles.slogan} /> */}
            <Image source={logo} style={LogOutStyles.logo} />
            <Text style={LogOutStyles.text}>Sesión finalizada con éxito</Text>
            <TouchableOpacity
              style={LogOutStyles.buttonLogOut}
              opacity={0.5}
              onPress={() => backToHome()}>
              <Text style={LogOutStyles.textButton}>Home</Text>
            </TouchableOpacity>
            <Image source={slogan} style={LogOutStyles.slogan} />
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
};

export default LogOut;
