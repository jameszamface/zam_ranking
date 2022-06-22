import React, {useMemo} from 'react';
import FastImage from 'react-native-fast-image';
import {Area, Image as ImageType} from '../types/common';
import styled from 'styled-components/native';
import {width as screenWidth, height as screenHeight} from '../../../constants';
import {convertAbsoluteValue} from '../utils';

interface Props extends ImageType {
  area: Area;
}

function TutorialImage({
  size: sizeFromProp,
  uri,
  type,
  area,
  horizontalAlign = 'left',
}: Props) {
  const size = useMemo(() => {
    if (!sizeFromProp) return;
    const {width, height} = sizeFromProp;
    return {
      width: convertAbsoluteValue(screenWidth, width),
      height: convertAbsoluteValue(screenHeight, height),
    };
  }, [sizeFromProp]);

  const position = useMemo(() => {
    if (!size?.width) return;

    const top = area.y + area.height / 2;
    const leftOffset = horizontalAlign === 'right' ? size.width : 0;
    const left = area.x + area.width / 2 - leftOffset;

    return {
      top,
      left,
    };
  }, [area, horizontalAlign, size]);

  if (type !== 'image') return null;
  if (!size || !position) return null;

  return (
    <Container {...position} {...size} pointerEvents="none">
      <Image {...size} source={{uri}} />
    </Container>
  );
}

const Container = styled.View<{
  top: number;
  left: number;
  width: number;
  height: number;
}>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
`;

const Image = styled(FastImage)<{
  width: number;
  height: number;
}>`
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`;

export default TutorialImage;
