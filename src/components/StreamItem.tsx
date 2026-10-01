import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import FocusableElement from './FocusableElement';
import {StreamDescription} from '../source/StreamDescription';
import {COLORS} from '../styles/Colors';
import {StreamItemElement} from './StreamItemElement';

export interface StreamItemProps {
  index: number;
  data: StreamDescription;
  preferredFocus?: boolean;
  onFocus?: (data?: StreamDescription) => void;
  onBlur?: (data?: StreamDescription) => void;
  onPress?: (data?: StreamDescription) => void;
}

export const StreamItem = (props: StreamItemProps) => {
  const {onFocus, onBlur, data} = props;

  const onFocusHandler = useCallback(() => {
    onFocus?.(props.data);
  }, []);

  const onBlurHandler = useCallback(() => {
    onBlur?.(data);
  }, []);

  return (
    <FocusableElement
      preferredFocus={props.preferredFocus ?? false}
      onPress={props.onPress}
      onFocus={onFocusHandler}
      onBlur={onBlurHandler}
      style={styles.tileContainer}
      onFocusOverrideStyle={styles.tileContainerSelected}>
      <View style={{flexDirection: 'row'}}>
        <StreamItemElement content={data.title} style={{flex: 7}} />
        <StreamItemElement content={data.streamType} style={{flex: 2}} />
        <StreamItemElement content={data.contentType} style={{flex: 1}} />
        <StreamItemElement check={data.isContentProtected} style={{flex: 1}} />
        <StreamItemElement check={data.hasCaptions} style={{flex: 1}} />
        <StreamItemElement check={data.isMultiPeriod} style={{flex: 1}} />
      </View>
    </FocusableElement>
  );
};

const styles = StyleSheet.create({
  tileContainer: {
    height: 35,
    width: '100%',
    flex: 1,
    borderRadius: 5,
    marginRight: 5,
    marginLeft: 5,
    paddingHorizontal: 12.5,
    overflow: 'hidden',
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  tileContainerSelected: {
    borderWidth: 1,
    backgroundColor: '#FFFF0022',
    borderColor: COLORS.YELLOW,
  },
});
