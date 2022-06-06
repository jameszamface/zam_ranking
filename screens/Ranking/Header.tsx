import React from 'react';
import styled from 'styled-components/native';
import {Category} from '../../api/category';
import TappableImage from '../../components/Tappable/TappableImage';
import TappableText from '../../components/Tappable/TappableText';
import ScrollViewWithScrollTo from '../../components/ScrollViewWithScrollTo';
import {ViewProps, ViewStyle} from 'react-native';
import Animated, {
  AnimateProps,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

interface Option {
  type: 'image' | 'text';
  showIndicator?: boolean;
  style?: ViewStyle;
  scrollThreshold?: boolean; // 처음 나온 설정에서만
}

const settings: {
  categories: Option[];
  thresholdIndex: number;
} = {
  categories: [
    {
      type: 'image',
      style: {
        paddingTop: 10,
        paddingBottom: 5,
      },
    },
    {
      type: 'text',
      showIndicator: true,
      style: {
        paddingHorizontal: 5,
      },
      scrollThreshold: true,
    },
    {
      type: 'text',
      showIndicator: false,
      style: {
        paddingHorizontal: 5,
      },
    },
  ],
  thresholdIndex: 1,
};

interface Props {
  categories: Category[][];
  selectedCategoryIds: string[];
  onCategoryPressed: (category: Category) => void;
  onThresholdY?: (thresholdY: number) => void;
  top?: number;
  translateY?: SharedValue<number>;
}

function Header({
  top,
  translateY,
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
      {categories.map((depthCategories, index) => {
        const selectedCategoryId = selectedCategoryIds[index];
        const option = settings.categories[index];

        return (
          <ScrollViewWithScrollTo
            key={index}
            horizontal
            onLayout={
              settings.thresholdIndex === index
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
`;

const convertCategoriesToComponents = (
  categories: Category[],
  selectedCategoryId: string,
  onPress: (category: Category) => void,
  option?: Option,
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
