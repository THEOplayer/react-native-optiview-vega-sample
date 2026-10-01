import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SOURCES} from '../source/Sources';
import {StreamDescription} from '../source/StreamDescription';
import {StreamItem} from '../components/StreamItem';
import {COLORS} from '../styles/Colors';
import THEOplayerLogo from '../assets/THEOplayerLogo.png';
import FireTVLogo from '../assets/firetv.png';

import * as AppPackage from '../../package.json';
import * as THEOplayerPackage from '../../node_modules/@dolby-optiview/react-native-vega/package.json';
import {StackScreenProps} from '@amazon-devices/react-navigation__stack';
import {AppStackParamList, Screens} from '../navigation/nagivation';
import {StreamListHeader} from '../components/StreamListHeader';
import {useIsFocused} from '@amazon-devices/react-navigation__core';

export const HomeScreen = ({
  navigation,
}: StackScreenProps<AppStackParamList, Screens.HOME_SCREEN>) => {
  const {width: deviceWidth, height: deviceHeight} = useWindowDimensions();
  const isScreenFocused = useIsFocused();

  const navigateToPlayer = (item: StreamDescription) => {
    navigation.navigate(Screens.PLAYER_SCREEN, {
      stream: item,
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: StreamDescription;
    index: number;
  }) => {
    return (
      <StreamItem
        preferredFocus={isScreenFocused && index === 0}
        index={index}
        key={`${item.id} ${index}`}
        data={item}
        onPress={() => navigateToPlayer(item)}
      />
    );
  };

  return (
    <View
      style={{
        width: deviceWidth,
        height: deviceHeight,
      }}>
      <View style={styles.fullscreen}>
        <View style={styles.header}>
          <Image source={THEOplayerLogo} style={styles.theoLogo} />
          <View style={{flex: 1}} />
          <Image source={FireTVLogo} style={styles.fireLogo} />
          <View style={styles.meta}>
            <Text
              style={
                styles.metaText
              }>{`THEOplayer version: ${THEOplayerPackage.version}`}</Text>
            <Text
              style={
                styles.metaText
              }>{`Kepler version: ${AppPackage.dependencies['@amazon-devices/react-native-kepler']}`}</Text>
          </View>
        </View>
        <StreamListHeader style={styles.listHeader} />
        <FlatList
          nativeID="scroll-view"
          keyExtractor={(item) => item.id}
          data={SOURCES}
          style={styles.list}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 40,
    backgroundColor: COLORS.BLACK,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  meta: {
    padding: 12.5,
  },
  metaText: {
    fontSize: 12,
    color: COLORS.WHITE,
  },
  theoLogo: {
    resizeMode: 'contain',
    width: 350,
    height: 60,
  },
  fireLogo: {
    resizeMode: 'contain',
    width: 60,
    height: 60,
  },
  listHeader: {
    marginTop: 25,
  },
  list: {
    width: '100%',
  },
});
