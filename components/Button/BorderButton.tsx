import React from 'react';
import isEqual from 'react-fast-compare';
import {Padding} from '../../constants/type/View';
import ButtonBase, {ButtonProps} from './ButtonBase';
import {BorderProps, SizeProps, TextProps} from './types';
import {makeBorderStyle, makeTextStyle} from './utils';

const BorderButton = (
  props: BorderProps & Padding & TextProps & ButtonProps & SizeProps,
) => {
  const borderStyle = makeBorderStyle(props);
  const textStyle = makeTextStyle(props);

  return (
    <ButtonBase
      {...props}
      containerStyle={[borderStyle, props.containerStyle]}
      textStyle={textStyle}
    />
  );
};

BorderButton.defaultProps = {
  color: '#cccccc',
  backgroundColor: '#ffffff',
  borderColor: '#cccccc',
  borderWidth: 1,
  borderRadius: '50%',
  paddingHorizontal: 10,
  paddingVertical: 5,
};

export default React.memo(BorderButton, isEqual);
