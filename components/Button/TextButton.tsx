import React from 'react';
import isEqual from 'react-fast-compare';
import ButtonBase, {ButtonProps} from './ButtonBase';
import {TextProps} from './types';
import {makeTextStyle} from './utils';

function TextButton(props: TextProps & ButtonProps) {
  const textStyle = makeTextStyle(props);
  return <ButtonBase {...props} textStyle={textStyle} />;
}

TextButton.defaultProps = {
  color: '#000000',
};

export default React.memo(TextButton, isEqual);
