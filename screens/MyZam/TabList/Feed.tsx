import React from 'react';
import styled from 'styled-components/native';
import Text from '../../../components/Text';
import useMyFeeds from '../../../hooks/useMyFeeds';

function Feed() {
  const {zamFeeds, isLoading, isError, fetchNextFeeds, hasNextPage} =
    useMyFeeds();
  return (
    <Container>
      <Text>Feed</Text>
    </Container>
  );
}

const Container = styled.View`
  width: 100%;
  height: 1500px;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
`;

export default Feed;
