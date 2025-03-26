import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Tabs  from './navigation/Tabs';
import { useFonts } from 'expo-font';

export default function App() {
  const [fontsLoaded] = useFonts({
    InterRegular: require('./assets/fonts/InterRegular.ttf'),
    InterBold: require('./assets/fonts/InterBold.ttf'),
    UrbanistSemiBold: require('./assets/fonts/UrbanistSemiBold.ttf'),
  });

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }


  return (
    <SafeAreaProvider style={styles.container}>
      <StatusBar style="auto" /><Tabs />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});