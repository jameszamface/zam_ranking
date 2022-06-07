import styled from 'styled-components/native';

const Text = styled.Text<{bold?: boolean; fontSize?: number; color?: string}>`
  font-size: ${props => props.fontSize || 13}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  color: ${props => props.color};
`;

export default Text;
