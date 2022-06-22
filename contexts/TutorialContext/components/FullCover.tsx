import styled from 'styled-components/native';

export const FullCover = styled.View<{color?: string}>`
  position: absolute;
  width: 100%;
  height: 100%;
  ${props => (props.color ? `background-color: ${props.color};` : null)}
  opacity: 0.5;
`;
