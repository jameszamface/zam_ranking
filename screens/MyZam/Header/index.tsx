import React from 'react';
import {SharedValue} from 'react-native-reanimated';
import styled from 'styled-components/native';
import Intro from './Intro';
import PickCarousel from './PickCarousel';
import Profile from './Profile';
import Shopping from './Shopping';
import {profileHeight, scrollTopMaxOverflow} from '../config';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import useProfile from '../../../hooks/useProfile';
import useRelation from '../../../hooks/useRelation';

interface Props {
  scrollTop: SharedValue<number>;
}

function Header({scrollTop}: Props) {
  const {top} = useSafeAreaInsets();
  const {profile} = useProfile();
  const {relation} = useRelation();

  return (
    <Container marginTop={top}>
      <Profile
        nickname={profile?.nick}
        backgroundImage="https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17519/0.JPG"
        profileImage="https://d1sjhoa769f1sq.cloudfront.net/qa_user_feeds/17513/0.JPG"
        scrollTop={scrollTop}
        height={profileHeight}
        scrollTopMaxOverflow={scrollTopMaxOverflow}
        followers={relation?.follower}
        followings={relation?.following}
      />
      <Intro tags={['복합성', '가을웜트루', '속쌍']} intro="곡튜브입니당~.~" />
      <Shopping />
      <PickCarousel nickname={profile?.nick} />
    </Container>
  );
}

const Container = styled.View<{marginTop: number}>`
  margin-top: ${props => -props.marginTop}px;
  width: 100%;
`;

export default Header;
