import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Intro from './Intro';
import PickCarousel from './PickCarousel';
import Profile from './Profile';
import Shopping from './Shopping';
import {profileHeight, scrollTopMaxOverflow} from '../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface Props {
  scrollTop: SharedValue<number>;
}

function Header({scrollTop}: Props) {
  const {top} = useSafeAreaInsets();
  return (
    <Container marginTop={top}>
      <Profile
        nickname="보틀친구곽튭2"
        backgroundImage="https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17519/0.JPG"
        profileImage="https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17513/0.JPG"
        scrollTop={scrollTop}
        height={profileHeight}
        scrollTopMaxOverflow={scrollTopMaxOverflow}
      />
      <Intro tags={['복합성', '가을웜트루', '속쌍']} intro="곡튜브입니당~.~" />
      <Shopping />
      <PickCarousel nickname="보틀친구곽튭2" />
    </Container>
  );
}

const Container = styled.View<{marginTop: number}>`
  margin-top: ${props => -props.marginTop}px;
  width: 100%;
`;

export default Header;
