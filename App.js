import { View, Text } from 'react-native';
import React,{useEffect} from 'react';

import SplashScreen from 'react-native-splash-screen'

/* Importing file responsible for entire navigation. */
import Navigation from './src/navigator/Navigation';

/* 
    ** We can use useColorScheme 
       to change mode depending
       upon dark/light mode on device.
       This assignment didn't mention anything about light/mode so didn't do :) 
*/

const App = () => {

  /* Hiding the splash screen on component mount */
  useEffect(() => {
    SplashScreen.hide();
  }, [])
  

  return (
    <Navigation/>
  )
}

export default App;