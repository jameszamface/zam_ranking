import React, {useCallback} from 'react';
import {FlatList, ListRenderItem, StyleProp, ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import TextButton from '../Button/TextButton';
import Text from '../Text';

interface Props<T> {
  title: string;
  titleColor?: string;
  headerMargin?: number;
  renderItem: ListRenderItem<T>;
  containerStyle?: StyleProp<ViewStyle>;
  data?: T[];
  gap?: number;
  rightButton?: string;
  onRightButton?: () => void;
}

function Carousel<T>({
  title,
  titleColor = '#000000',
  headerMargin = 10,
  data,
  containerStyle,
  renderItem,
  gap,
  rightButton,
  onRightButton,
}: Props<T>) {
  const itemSeparatorComponent = useCallback(() => {
    if (!gap) return null;
    return <Separator gap={gap} />;
  }, [gap]);

  return (
    <Container style={containerStyle}>
      <HeaderContainer rightButton={!!rightButton} headerMargin={headerMargin}>
        <Text color={titleColor} bold fontSize={15}>
          {title}
        </Text>
        {rightButton && (
          <TextButton color="#999999" onPress={onRightButton}>
            {rightButton}
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
  justify-content: center;
`;

const HeaderContainer = styled.View<{
  rightButton?: boolean;
  headerMargin?: number;
}>`
  flex-direction: row;
  justify-content: ${props =>
    props.rightButton ? 'space-between' : 'flex-start'};
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
  margin-bottom: ${props => props.headerMargin}px;
`;

const Separator = styled.View<{gap: number}>`
  width: ${props => props.gap || 0}px;
  height: 0px;
`;

export default Carousel;
