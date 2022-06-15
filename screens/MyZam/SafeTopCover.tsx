import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  scrollTop: SharedValue<number>;
  triggerOffset?: number;
}

function SafeTopCover({scrollTop, triggerOffset = 0}: Props) {
  const {top} = useSafeAreaInsets();
  const style = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        scrollTop.value,
        [triggerOffset + top * 0.5, triggerOffset],
        [1, 0],
      ),
    }),
    [scrollTop],
  );
  return <Cover style={style} height={top} />;
}

const Cover = styled(Animated.View)<{height: number}>`
  position: absolute;
  width: 100%;
  height: ${props => props.height}px;
  background-color: #ffffff;
  z-index: 1;
`;

export default SafeTopCover;
