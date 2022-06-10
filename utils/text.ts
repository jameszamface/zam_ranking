import rnTextSize from 'react-native-text-size';

interface Props {
  text: string;
  width: number;
  maxLines?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
}

export const inferTextSize = async (props: Props) => {
  const {height, lineCount: lines} = await rnTextSize.measure(props);

  if (!props.maxLines || lines <= props.maxLines) {
    return {height, lines};
  }

  const ratio = lines / props.maxLines;

  return {
    height: height * ratio,
    lines: props.maxLines,
  };
};
