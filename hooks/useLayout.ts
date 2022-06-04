import {useCallback, useState} from 'react';
import {LayoutChangeEvent} from 'react-native';

interface Layout {
  x: number;
  y: number;
  width: number;
  height: number;
}

function useLayout() {
  const [layout, setLayout] = useState<Layout | undefined>();

  const onLayout = useCallback(({nativeEvent}: LayoutChangeEvent) => {
    setLayout(nativeEvent.layout);
  }, []);

  return {
    layout,
    onLayout,
  };
}

export default useLayout;
