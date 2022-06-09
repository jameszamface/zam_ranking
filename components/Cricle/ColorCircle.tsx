import styled from 'styled-components/native';

export default styled.View<{size: number; color: string; marginRight?: number}>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: ${props => props.size / 2}px;
  background-color: ${props => props.color};
  margin-right: ${props => props.marginRight || 0}px;
`;
