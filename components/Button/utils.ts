import { Padding, Margin } from '../../constants/type/View';
import {BorderProps, SizeProps, TextProps} from './types';

export const makeBorderStyle = (props?: BorderProps & Padding & SizeProps) => {
  if (!props) {
    return;
  }
  return {
    borderColor: props?.borderColor,
    borderWidth: props?.borderWidth,
    borderRadius: props?.borderRadius,
    paddingHorizontal: props?.paddingHorizontal,
    paddingVertical: props?.paddingVertical,
    width: props?.width,
    height: props?.height,
  };
};

export const makeTextStyle = (props?: TextProps) => {
  if (!props) {
    return;
  }
  return {
    color: props?.color,
    fontSize: props?.fontSize,
    fontWeight: props?.bold ? 'bold' : 'normal',
  } as const;
};

export const makeMarginStyle = (props?: Margin) => {
  if (!props) return;
  return {
    marginTop: props?.marginTop,
    marginBottom: props?.marginBottom,
    marginLeft: props?.marginLeft,
    marginRight: props?.marginRight,
    marginHorizontal: props?.marginHorizontal,
    marginVertical: props?.marginVertical,
  };
};
