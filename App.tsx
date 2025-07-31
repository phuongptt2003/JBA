/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LoginScreen } from './src/screens/Auth/Login';
import HomeScreen from './src/screens/Home';
import Register from './src/screens/Auth/Register';
import ForgotPassword, { ResetPasswordScreen, VerifyOTP } from './src/screens/Auth/Authentication';
import store from './src/store/store';
import { LanguageProvider } from './src/contexts/language-context';
import DetailReport from './src/screens/History/DetailReport';
import EditProfile from './src/screens/Account/EditProfile';
import DetailScanFace from './src/screens/Scan/DetailScanFace';

const Stack = createNativeStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator initialRouteName='Login'>
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Register" component={Register} />
      <Stack.Screen options={{ headerShown: false }} name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen options={{ headerShown: false }} name="VerifyOTP" component={VerifyOTP} />
      <Stack.Screen options={{ headerShown: false }} name="ResetPassword" component={ResetPasswordScreen} />
      <Stack.Screen options={{ headerShown: false }} name="ChangePassword" component={ResetPasswordScreen} />
      <Stack.Screen options={{ headerShown: true }} name="DetailReport" component={DetailReport} />
      <Stack.Screen options={{ headerShown: true }} name="EditProfile" component={EditProfile} />
      <Stack.Screen options={{ headerShown: true }} name="DetailScanFace" component={DetailScanFace} />
    </Stack.Navigator>
  );
}

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <Provider store={store}>
      <LanguageProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </LanguageProvider>
    </Provider>
  );
}


const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
function createStackNavigator() {
  throw new Error('Function not implemented.');
}

