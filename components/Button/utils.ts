import {BorderProps, PaddingProps} from './types';

export const makeBorderStyle = (props?: BorderProps & PaddingProps) => {
  if (!props) {
    return;
  }
  return {
    borderColor: props?.borderColor,
    borderWidth: props?.borderWidth,
    borderRadius: props?.borderRadius,
    paddingHorizontal: props?.paddingHorizontal,
    paddingVertical: props?.paddingVertical,
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
