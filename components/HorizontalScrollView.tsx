import React from 'react';
import {ScrollView, ScrollViewProps} from 'react-native';

function HorizontalScrollView({children, ...props}: ScrollViewProps & Props) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator {...props}>
      {children}
    </ScrollView>
  );
}

export default HorizontalScrollView;
