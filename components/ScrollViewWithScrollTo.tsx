import React, {useCallback} from 'react';
import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollViewProps,
} from 'react-native';
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  scrollTo as reanimatedScrollTo,
  withDelay,
  withTiming,
  AnimateProps,
} from 'react-native-reanimated';

export type ScrollTo = (
  offset: {x: number} | {y: number},
  options?: {delay?: number; duration?: number},
) => void;

const ScrollViewWithScrollTo = ({
  children,
  ...props
}: AnimateProps<ScrollViewProps>) => {
  const ref = useAnimatedRef<Animated.ScrollView>();
  const scrollX = useSharedValue(0);
  const scrollY = useSharedValue(0);

  useDerivedValue(() => {
    reanimatedScrollTo(ref, scrollX.value, scrollY.value, false);
  });

  const scrollTo: ScrollTo = useCallback(
    (offset, options?: {delay?: number; duration?: number}) => {
      const scroll = 'x' in offset ? scrollX : scrollY;
      const value = 'x' in offset ? offset.x : offset.y;
      scroll.value = withDelay(
        options?.delay || 0,
        withTiming(value, {
          duration: options?.duration,
        }),
      );
    },
    [scrollX, scrollY],
  );

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {scrollTo});
    }
    return child;
  });

  const onMomentumScrollEnd = useCallback(
    ({
      nativeEvent: {
        contentOffset: {x, y},
      },
    }: NativeSyntheticEvent<NativeScrollEvent>) => {
      scrollX.value = x;
      scrollY.value = y;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return (
    <Animated.ScrollView
      scrollEventThrottle={25}
      onMomentumScrollEnd={onMomentumScrollEnd}
      ref={ref}
      {...props}>
      {childrenWithProps}
    </Animated.ScrollView>
  );
};

export default ScrollViewWithScrollTo;
