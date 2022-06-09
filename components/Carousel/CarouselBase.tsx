import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import TextButton from '../Button/TextButton';
import Text from '../Text';

interface Props<T> {
  title: string;
  renderItem: ListRenderItem<T>;
  data?: T[];
  gap?: number;
  hasMore?: boolean;
}

function Carousel<T>({title, data, renderItem, gap, hasMore}: Props<T>) {
  const itemSeparatorComponent = useCallback(() => {
    if (!gap) return null;
    return <Separator width={gap} />;
  }, [gap]);

  return (
    <Container>
      <HeaderContainer hasMore={hasMore}>
        <Text bold fontSize={15}>
          {title}
        </Text>
        {hasMore && (
          <TextButton
            color="#999999"
            onPress={() => console.log(`${title} 더 보기`)}>
            {'더 보기'}
          </TextButton>
        )}
      </HeaderContainer>
      <FlatList
        horizontal
        contentContainerStyle={contentContainerStyle}
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={itemSeparatorComponent}
        data={data}
        renderItem={renderItem}
      />
    </Container>
  );
}

const contentContainerStyle: StyleProp<ViewStyle> = {
  paddingHorizontal: 10,
};

const Container = styled.View`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const HeaderContainer = styled.View<{hasMore?: boolean}>`
  flex-direction: row;
  justify-content: ${props => (props.hasMore ? 'space-between' : 'flex-start')};
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: 10px;
`;

const Separator = styled.View<{width: number}>`
  width: ${props => props.width || 0}px;
`;

export default Carousel;
