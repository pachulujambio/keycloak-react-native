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
  slogan: {
    width: '80%',
    height: 150,
    resizeMode: 'contain',
    marginTop: 40,
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
