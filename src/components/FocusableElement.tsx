import React, {useState} from 'react';
import {StyleProp, Pressable, PressableProps, ViewStyle} from 'react-native';

interface FocusableElementProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  preferredFocus?: boolean;
  children?: React.ReactNode;
  onBlur?: () => void;
  onFocus?: () => void;
  onFocusOverrideStyle: StyleProp<ViewStyle>;
  onPress?: () => void;
}

export const FocusableElement = ({
  preferredFocus,
  children,
  onPress,
  onBlur,
  onFocus,
  onFocusOverrideStyle,
  style,
  ...otherProps
}: FocusableElementProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const focusHandler = () => {
    setIsFocused(true);
    onFocus?.();
  };
  const blurHandler = () => {
    setIsFocused(false);
    onBlur?.();
  };

  return (
    <Pressable
      role="button"
      onFocus={focusHandler}
      onBlur={blurHandler}
      hasTVPreferredFocus={preferredFocus}
      onPress={onPress}
      style={[style, isFocused ? onFocusOverrideStyle : undefined]}
      {...otherProps}>
      {children}
    </Pressable>
  );
};

export default FocusableElement;
