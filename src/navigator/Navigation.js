import { View, Text } from 'react-native';
import React from 'react';

/* Importing libraries required to facilitate navigation. */
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

/* Importing the files/components among which the navigation will occur. */
import LoginScreen from '../auth/LoginScreen';
import NotificationScreen from '../notification/NotificationScreen';

const Navigation = () => {

  /* Variable to create the stack navigation. */  
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigation;