import React, {ReactNode} from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import styled from 'styled-components/native';
import ColorCircle from './Cricle/ColorCircle';
import RowContainer from './RowContainer';
import Text from './Text';

interface Goods {
  image?: string;
  name: string;
  color: {
    number: string;
    string: string;
  };
}

interface Props {
  title: string;
  backgroundColor?: string;
  goods: Goods;
}

function Pick({title, backgroundColor = '#ffffff', goods}: Props) {
  return (
    <Container backgroundColor={backgroundColor}>
      <Text fontSize={15} bold lineHeihgt={20}>
        {title}
      </Text>
      <GoodsComponent goods={goods} />
    </Container>
  );
}

const GoodsComponent = ({goods}: {goods: Goods}) => {
  return (
    <GoodsContainer>
      <ImageContainer>
        <Image source={{uri: goods.image}} />
      </ImageContainer>
      <MetaContainer>
        <RowContainer marginBottom={5}>
          {goods.name.split(' ').map(text => (
            <Text> {text}</Text>
          ))}
        </RowContainer>
        <ColorInfoContainer>
          <ColorCircle color={goods.color.number} size={10} marginRight={5} />
          <Text color="#999999">{goods.color.string}</Text>
        </ColorInfoContainer>
      </MetaContainer>
    </GoodsContainer>
  );
};

const Container = styled.View<{backgroundColor: string}>`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  background-color: ${props => props.backgroundColor};
  padding: 15px 12px;
  justify-content: space-between;
`;

const GoodsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const ImageContainer = styled.View`
  width: 50px;
  height: 50px;
  border-width: 1.5px;
  border-color: #eeeeee;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const Image = styled(FastImage)`
  width: 35px;
  height: 35px;
`;

const MetaContainer = styled.View`
  flex: 1;
`;

const ColorInfoContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default Pick;
