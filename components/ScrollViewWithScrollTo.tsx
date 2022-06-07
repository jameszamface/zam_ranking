import React, {useCallback, useRef} from 'react';
import {ScrollView as OriginScrollView, ScrollViewProps} from 'react-native';
import styled from 'styled-components/native';

export type ScrollTo = (
  offset: {x: number} | {y: number},
  options?: {delay?: number; duration?: number},
) => void;

export interface Separtor {
  width: number;
  color: string;
}

interface Props {
  backgroundColor?: string;
  separator?: Separtor;
}

const ScrollViewWithScrollTo = ({
  children,
  separator,
  backgroundColor,
  ...props
}: ScrollViewProps & Props) => {
  const ref = useRef<OriginScrollView>(null);

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
    <ScrollView
      scrollEventThrottle={25}
      separator={separator}
      backgroundColor={backgroundColor}
      ref={ref}
      {...props}>
      {childrenWithProps}
    </ScrollView>
  );
};

const ScrollView = styled(OriginScrollView)<{
  separator?: Separtor;
  backgroundColor?: string;
}>`
  border-bottom-width: ${props => props.separator?.width || 0}px;
  border-bottom-color: ${props => props.separator?.color};
`;

export default ScrollViewWithScrollTo;
