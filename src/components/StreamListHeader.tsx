import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {StreamItemElement} from './StreamItemElement';

export interface StreamItemProps {
  style?: StyleProp<ViewStyle>;
}

export const StreamListHeader = ({style}: StreamItemProps) => {
  return (
    <View style={[styles.container, style]}>
      <View style={{flexDirection: 'row'}}>
        <StreamItemElement
          content={'Title'}
          style={{flex: 7}}
          textTyle={styles.text}
        />
        <StreamItemElement
          content={'Stream'}
          style={{flex: 2}}
          textTyle={styles.text}
        />
        <StreamItemElement
          content={'Content'}
          style={{flex: 1}}
          textTyle={styles.text}
        />
        <StreamItemElement
          content={'DRM'}
          style={{flex: 1}}
          textTyle={styles.textCentered}
        />
        <StreamItemElement
          content={'Captions'}
          style={{flex: 1}}
          textTyle={styles.textCentered}
        />
        <StreamItemElement
          content={'Multi-period'}
          style={{flex: 1}}
          textTyle={styles.textCentered}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 12.5,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  textCentered: {
    fontWeight: 'bold',
    fontSize: 12,
    alignSelf: 'center',
  },
});
