import React, {useCallback} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';
import Animated, {
  useAnimatedRef,
  useDerivedValue,
  useSharedValue,
  scrollTo as reanimatedScrollTo,
  withDelay,
  withTiming,
  AnimateProps,
} from 'react-native-reanimated';

const ReanimatedScrollView = Animated.createAnimatedComponent(ScrollView);

export type ScrollTo = (
  offset: {x?: number; y?: number},
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
    reanimatedScrollTo(ref, scrollX.value, scrollY.value, true);
  }, []);

  const scrollTo: ScrollTo = useCallback(
    (offset, options?: {delay?: number; duration?: number}) => {
      if (offset.x !== undefined) {
        scrollX.value = withDelay(
          options?.delay || 0,
          withTiming(offset.x, {
            duration: options?.duration,
          }),
        );
      }
      if (offset.y !== undefined) {
        scrollY.value = withDelay(
          options?.delay || 0,
          withTiming(offset.y, {
            duration: options?.duration,
          }),
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {scrollTo});
    }
    return child;
  });

  return (
    <ReanimatedScrollView ref={ref} {...props}>
      {childrenWithProps}
    </ReanimatedScrollView>
  );
};

export default ScrollViewWithScrollTo;
