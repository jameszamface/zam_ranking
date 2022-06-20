import React from 'react';
import isEqual from 'react-fast-compare';
import {Margin, Padding} from '../../constants/type/View';
import ButtonBase, {ButtonProps} from './ButtonBase';
import {BorderProps, SizeProps, TextProps} from './types';
import {makeBorderStyle, makeTextStyle, makeMarginStyle} from './utils';

const BorderButton = (
  props: BorderProps & Padding & Margin & TextProps & ButtonProps & SizeProps,
) => {
  const borderStyle = makeBorderStyle(props);
  const marginStyle = makeMarginStyle(props);
  const textStyle = makeTextStyle(props);

  return (
    <ButtonBase
      {...props}
      containerStyle={[marginStyle, borderStyle, props.containerStyle]}
      textStyle={[textStyle, props.textStyle]}
    />
  );
};

BorderButton.defaultProps = {
  color: '#cccccc',
  backgroundColor: '#ffffff',
  borderColor: '#cccccc',
  borderWidth: 1,
  paddingHorizontal: 10,
  paddingVertical: 5,
};

export default React.memo(BorderButton, isEqual);
