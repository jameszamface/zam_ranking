import React, {PropsWithChildren} from 'react';
import isEqual from 'react-fast-compare';
import ButtonBase, {ButtonProps} from './ButtonBase';
import {TextProps} from './types';
import {makeTextStyle, makeMarginStyle} from './utils';
import {Margin} from '../../constants/type/View';

function TextButton(
  props: PropsWithChildren<TextProps & ButtonProps & Margin>,
) {
  const textStyle = makeTextStyle(props);
  const marginStyle = makeMarginStyle(props);
  return (
    <ButtonBase {...props} containerStyle={marginStyle} textStyle={textStyle} />
  );
}

TextButton.defaultProps = {
  color: '#000000',
};

export default React.memo(TextButton, isEqual);
