/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Firebase Messaging ကို import လုပ်ပါ
import messaging from '@react-native-firebase/messaging';

// App ပိတ်ထားချိန် (Quit State) သို့မဟုတ် Background ရောက်နေချိန်တွင် 
// Notification လက်ခံရရှိမှုကို ကိုင်တွယ်ရန်
// ဤ function သည် AppRegistry အပေါ်မှာ ရှိနေရပါမည်
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);