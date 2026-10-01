import React from 'react';
import {createStackNavigator} from '@amazon-devices/react-navigation__stack';
import {HomeScreen} from './screens/HomeScreen';
import {PlayerScreen} from './screens/PlayerScreen';
import {NavigationContainer} from '@amazon-devices/react-navigation__native';
import {AppStackParamList, Screens} from './navigation/nagivation';
import {
  enableFreeze,
  enableScreens,
} from '@amazon-devices/react-native-screens';
import {ContentProtectionRegistry} from '@theoplayer/react-native-vega';
import {KeyOSDrmWidevineContentProtectionIntegrationFactory} from '@theoplayer/react-native-drm';

// Enable play-out of assets protected with BuyDRM by registering a DRM connector.
ContentProtectionRegistry.registerContentProtectionIntegration(
  'keyos_buydrm',
  'widevine',
  new KeyOSDrmWidevineContentProtectionIntegrationFactory(),
);

enableScreens();
enableFreeze();

const Stack = createStackNavigator<AppStackParamList>();

export const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={Screens.HOME_SCREEN}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={Screens.PLAYER_SCREEN}
          component={PlayerScreen}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
