import React, {useMemo, useState} from 'react';
import styled from 'styled-components/native';
import {Area} from '../types/common';
import {width as screenWidth, height as screenHeight} from '../../../constants';

function useCovers() {
  const [accessibleArea, setAccessibleArea] = useState<Area>();

  const Covers = useMemo(() => {
    if (!accessibleArea) return;
    const {x, y, width, height} = accessibleArea;
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
        <Cover {...top} />
        <Cover {...left} />
        <Cover {...right} />
        <Cover {...bottom} />
      </>
    );
  }, [accessibleArea]);

  return {accessibleArea, setAccessibleArea, Covers};
}

const Cover = styled.View<{
  width: number;
  height: number;
  top: number;
  left: number;
}>`
  position: absolute;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
  top: ${props => props.top}px;
  left: ${props => props.left}px;
  background-color: yellow;
  opacity: 0.5;
`;

export default useCovers;
