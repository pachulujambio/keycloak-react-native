import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Image,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';

const LogOutStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
    //justifyContent: 'center',
  },
  fondo: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    width: '100%',
    color: 'white',
    marginTop: 60,
    fontSize: 30,
    lineHeight: 65,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000000c0',
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 30,
  },
  input: {
    height: 50,
    width: 300,
    margin: 12,
    borderWidth: 2,
    padding: 10,
    backgroundColor: '#C0C0C0',
    marginTop: 10,
    fontSize: 20,
  },
  slogan: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 40,
  },
  buttonLogIn: {
    backgroundColor: '#0f273d',
    width: 150,
    height: 40,
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  textButton: {
    color: 'white',
    fontSize: 22,
  },
  sloganLargo: {
    width: '90%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 15,
  },
});

export default LogOutStyles;
