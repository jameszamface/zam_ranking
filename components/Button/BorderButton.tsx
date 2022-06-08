import _, {isEqual} from 'lodash';
import React from 'react';
import ButtonBase, {ButtonProps} from './ButtonBase';

interface BorderButtonProps {
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderRadius?: number;
}

interface Props extends BorderButtonProps {
  selectedStyle?: BorderButtonProps;
}

const BorderButton = (props: Props & ButtonProps) => {
  const borderContainerStyle = makeContainerStyle(props);
  const borderTextStyle = makeTextStyle(props);

  const containerStyle = _.merge(borderContainerStyle, props.containerStyle);
  const textStyle = _.merge(borderTextStyle, props.textStyle);

  return (
    <ButtonBase
      {...props}
      containerStyle={containerStyle}
      textStyle={textStyle}
    />
  );
};

const makeContainerStyle = (props?: BorderButtonProps) => {
  if (!props) {
    return;
  }
  return {
    borderColor: props?.borderColor,
    borderWidth: props?.borderWidth,
    borderRadius: props?.borderRadius,
    backgroundColor: props?.backgroundColor,
  };
};

const makeTextStyle = (props?: BorderButtonProps) => {
  if (!props) {
    return;
  }
  return {
    color: props?.color,
  };
};

BorderButton.defaultProps = {
  color: '#cccccc',
  backgroundColor: '#ffffff',
  borderColor: '#cccccc',
  borderWidth: 1,
};

export default React.memo(BorderButton, isEqual);
