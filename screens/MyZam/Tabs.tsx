import React from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import TappableText from '../../components/Tappable/TappableText';

interface Props<T> {
  tabs: readonly T[];
  selectedTab: T;
  tabLabels: {[key in T]: string};
  onPress?: (tab: T) => void;
}

function Tabs<T extends string>({
  tabs,
  selectedTab,
  tabLabels,
  onPress,
}: Props<T>) {
  return (
    <Container>
      {tabs.map(tab => (
        <TappableText
          style={tabStyle}
          key={`@my_zam_${tab}`}
          item={tab}
          onPress={onPress}
          selected={tab === selectedTab}
          showIndicator>
          {tabLabels[tab]}
        </TappableText>
      ))}
    </Container>
  );
}

const Container = styled.View`
  flex-direction: row;
  background-color: #ffffff;
`;

const tabStyle: StyleProp<ViewStyle> = {
  flex: 1,
};

export default Tabs;
