import React from 'react';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import TappableImage from '../../components/Tappable/TappableImage';
import TappableText from '../../components/Tappable/TappableText';
import ScrollViewWithScrollTo from '../../components/ScrollViewWithScrollTo';
import {ViewProps} from 'react-native';
import Animated, {
  AnimateProps,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {Dictionary} from '../../constants/types';
import {HeaderOption, headerOptions} from './config';

interface Props {
  depths: string[];
  categories: Dictionary<Category[]>;
  selectedCategoryIds: Dictionary<string>;
  onCategoryPressed: (category: Category) => void;
  onThresholdY?: (thresholdY: number) => void;
  top?: number;
  translateY?: SharedValue<number>;
}

function Header({
  top,
  translateY,
  depths,
  categories,
  selectedCategoryIds,
  onCategoryPressed,
  onThresholdY,
}: AnimateProps<ViewProps> & Props) {
  const style = useAnimatedStyle(
    () => ({
      transform: [{translateY: translateY?.value || 0}],
    }),
    [translateY],
  );

  return (
    <Container style={style} top={top}>
      {depths.map((depth, index) => {
        const depthCategories = categories[depth];
        const selectedCategoryId = selectedCategoryIds[depth];
        const option = headerOptions.categories[index];

        return (
          <ScrollViewWithScrollTo
            key={index}
            horizontal
            onLayout={
              headerOptions.thresholdDepth === depth
                ? ({
                    nativeEvent: {
                      layout: {y},
                    },
                  }) => {
                    onThresholdY && onThresholdY(y);
                  }
                : undefined
            }
            contentContainerStyle={option.style}
            showsHorizontalScrollIndicator={false}>
            {convertCategoriesToComponents(
              depthCategories,
              selectedCategoryId,
              onCategoryPressed,
              option,
            )}
          </ScrollViewWithScrollTo>
        );
      })}
    </Container>
  );
}

// 나중에 Reanimated.View로 교체
const Container = styled(Animated.View)<{top?: number}>`
  top: ${props => props.top || 0}px;
  background-color: #ffffff;
  position: absolute;
  z-index: 1;
`;

const convertCategoriesToComponents = (
  categories: Category[],
  selectedCategoryId: string,
  onPress: (category: Category) => void,
  option?: HeaderOption,
) => {
  return categories.map(category => {
    const isText = option?.type === 'text';
    const Component = isText ? TappableText : TappableImage;
    const gap = isText ? 10 : 5;

    return (
      <Component
        item={category}
        key={category.cdId}
        gap={gap}
        image="" // only for TappableImage
        backgroundColor={category.cdEtc1} // only for TappableImage
        showIndicator={option?.showIndicator} // only for TappableText
        selectedColor="#000000"
        selected={selectedCategoryId === category.cdId}
        onPress={onPress}>
        {category.cdNm}
      </Component>
    );
  });
};

export default Header;
