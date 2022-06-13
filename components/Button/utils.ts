import {Padding} from '../../constants/type/View';
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
    fontWeight: props?.isBold ? 'bold' : 'normal',
  } as const;
};
