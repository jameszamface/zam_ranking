import styled from 'styled-components/native';

export default styled.View<{marginTop?: number; marginBottom?: number}>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-top: ${props => props.marginTop || 0}px;
  margin-bottom: ${props => props.marginBottom || 0}px;
`;
