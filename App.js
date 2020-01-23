import React from 'react';
import { Provider } from 'react-redux';
import SplashScreen from './screens/Splashscreen';
import createStore from './store';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native';

const store = createStore();

function App() {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <SplashScreen />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
