import styled from 'styled-components/native';
import {Margin} from '../constants/type/View';

const Text = styled.Text<
  {
    bold?: boolean;
    fontSize?: number;
    color?: string;
    textAlign?: 'left' | 'center' | 'right';
    lineHeihgt?: number;
  } & Margin
>`
  font-size: ${props => props.fontSize || 13}px;
  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  color: ${props => props.color || '#000000'};
  margin-left: ${props => props.marginLeft || props.marginHorizontal || 0}px;
  margin-right: ${props => props.marginRight || props.marginHorizontal || 0}px;
  margin-top: ${props => props.marginTop || props.marginVertical || 0}px;
  margin-bottom: ${props => props.marginBottom || props.marginVertical || 0}px;
  text-align: ${props => props.textAlign || 'left'};
  line-height: ${props => props.lineHeihgt || 0}px;
`;

export default Text;
