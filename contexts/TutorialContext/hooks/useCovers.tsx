import React, {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {Area} from '../types/common';
import {width as screenWidth, height as screenHeight} from '../../../constants';

interface Props {
  blockOutside?: boolean;
  color?: string
}
function useCovers({blockOutside, color = 'transparent'}: Props) {
  const [area, setArea] = useState<Area>();

  const Covers = useMemo(() => {
    if (!area || !blockOutside) return null;
    const {x, y, width, height} = area;
    const top = {
      width: screenWidth,
      height: y,
      top: 0,
      left: 0,
    };
    const left = {
      width: x,
      height,
      top: y,
      left: 0,
    };
    const right = {
      width: screenWidth - x - width,
      height,
      top: y,
      left: x + width,
    };
    const bottom = {
      width: screenWidth,
      height: screenHeight - y - height,
      top: y + height,
      left: 0,
    };

    return (
      <>
        <Cover {...top} color={color} />
        <Cover {...left} color={color} />
        <Cover {...right} color={color} />
        <Cover {...bottom} color={color} />
      </>
    );
  }, [area, blockOutside, color]);

  return {area, setArea, Covers};
}

const Cover = styled.View<{
  width: number;
  height: number;
  top: number;
  left: number;
  color: string;
}>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: ${props => props.color};
`;

export default useCovers;
