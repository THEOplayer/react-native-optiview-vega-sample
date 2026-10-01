import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import React from 'react';
import Radio from '../assets/Radio.png';
import RadioChecked from '../assets/RadioChecked.png';

export interface StreamItemElementProps {
  content?: string;
  style?: StyleProp<ViewStyle>;
  textTyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  check?: boolean;
}

export const StreamItemElement = ({
  content,
  style,
  textTyle,
  imageStyle,
  check,
}: StreamItemElementProps) => {
  const needsCheck = check !== undefined;
  return (
    <View
      style={[
        styles.column,
        {alignItems: needsCheck ? 'center' : 'flex-start'},
        style,
      ]}>
      {needsCheck && (
        <Image
          source={check ? RadioChecked : Radio}
          style={[styles.image, imageStyle]}
        />
      )}
      {content && <Text style={[styles.columnText, textTyle]}>{content}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    justifyContent: 'center',
  },
  columnText: {
    padding: 2.5,
    fontSize: 12,
    color: 'white',
  },
  image: {
    width: 12.5,
    height: 12.5,
    tintColor: 'white',
  },
});
