import React, {useCallback, useRef} from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';

export type ScrollTo = (
  offset: {x: number} | {y: number},
  options?: {delay?: number; duration?: number},
) => void;

const ScrollViewWithScrollTo = ({children, ...props}: ScrollViewProps) => {
  const ref = useRef<ScrollView>(null);

  const scrollTo: ScrollTo = useCallback(
    (offset, options?: {delay?: number; duration?: number}) => {
      setTimeout(() => {
        ref.current?.scrollTo(offset);
      }, options?.duration || 0);
    },
    [],
  );

  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {scrollTo});
    }
    return child;
  });

  return (
    <ScrollView scrollEventThrottle={25} ref={ref} {...props}>
      {childrenWithProps}
    </ScrollView>
  );
};

export default ScrollViewWithScrollTo;
