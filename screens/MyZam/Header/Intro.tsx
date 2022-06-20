import React from 'react';
import styled from 'styled-components/native';
import BorderButton from '../../../components/Button/BorderButton';
import RowContainer from '../../../components/RowContainer';
import Text from '../../../components/Text';
import {TutorialTrigger} from '../../../contexts/TutorialContext/index';

interface Props {
  tags?: string[];
  intro?: string;
}

function Intro({tags, intro}: Props) {
  return (
    <Container>
      {tags && (
        <TextContainer>
          {tags.map(tag => (
            <Text key={`@intro_${tag}`} bold fontSize={14} marginBottom={15}>
              {' '}
              {`#${tag}`}
            </Text>
          ))}
        </TextContainer>
      )}
      {intro && (
        <TextContainer marginBottom={25}>
          <Text fontSize={14}>{intro}</Text>
        </TextContainer>
      )}
      <TutorialTrigger step={0} blockOutside>
        <BorderButton onPress={() => console.log('프로필 공유')} borderRadius={5} color="#000000">
          프로필 공유
        </BorderButton>
      </TutorialTrigger>
    </Container>
  );
}

const Container = styled.View`
  margin-top: -100px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  overflow: hidden;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  padding: 20px 0px;
`;

const TextContainer = styled(RowContainer)`
  width: 100%;
  justify-content: center;
  flex-wrap: wrap;
`;

export default Intro;
