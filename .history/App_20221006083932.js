import {React} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import logo from './assets/logo.png';
import fondo from './assets/fondo.png';

const App = () => {
  <View>
    <ImageBackground source={fondo} resizeMode="cover" style={styles.image}>
      <ScrollView>
        <Image source={logo} />
      </ScrollView>
    </ImageBackground>
  </View>;
};

const styles = StyleSheet.create({
  view: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  scroll: {
    fontSize: 24,
    fontWeight: '600',
  },
});

export default App;
