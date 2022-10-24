import {React} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import logo from './assets/logo.png';

const App = () => {
  <View>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
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
