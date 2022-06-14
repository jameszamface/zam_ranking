import React from 'react';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import styled from 'styled-components/native';
import BorderButtonOrigin from '../../../components/Button/BorderButton';
import TextButtonOrigin from '../../../components/Button/TextButton';
import CircleImage from '../../../components/Cricle/ImageCircle';
import RowContainerOrigin from '../../../components/RowContainer';
import Text from '../../../components/Text';
import {width} from '../../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableWithoutFeedback} from 'react-native';

interface Props {
  scrollTop: SharedValue<number>;
  nickname: string;
  backgroundImage?: string;
  profileImage?: string;
  followers?: number;
  followings?: number;
  stickers?: number;
  height?: number;
  scrollTopMaxOverflow?: number;
}

interface ButtonProps {
  children: string;
  marginRight?: boolean;
  onPress?: (children: string) => void;
}

const outputs = {
  scale: [2, 1, 1, 1],
  opacity: [1, 1, 1, 0],
};

function Profile(props: Props) {
  const {
    scrollTop,
    backgroundImage,
    height = 0,
    scrollTopMaxOverflow = 0,
  } = props;

  const scrollInputRange = [scrollTopMaxOverflow, 0, height / 4, height];
  const containerStyle = useAnimatedStyle(() => {
    const scale = interpolate(scrollTop.value, scrollInputRange, outputs.scale);
    const opacity = interpolate(
      scrollTop.value,
      scrollInputRange,
      outputs.opacity,
    );
    const translateY = scrollTop.value * 0.8;

    return {
      opacity,
      transform: [{translateY}, {scale: scale}],
    };
  }, [scrollTop]);

  return (
    <Container style={containerStyle} height={height}>
      <BackgroundImageContainer>
        <CircleImage size={width} image={backgroundImage} />
      </BackgroundImageContainer>

      <Dim height={height} />

      <Foreground {...props} />

      <Controls />
    </Container>
  );
}

const Foreground = ({
  nickname,
  profileImage,
  height = 0,
  followers = 0,
  followings = 0,
  stickers = 0,
  scrollTop,
}: Props) => {
  const foregroundStyle = useAnimatedStyle(() => {
    const translateY = scrollTop.value * 0.1;
    return {
      transform: [{translateY}],
    };
  }, [scrollTop]);

  const onFollowers = () => {
    console.log('onFollowers');
  };

  const onFollowings = () => {
    console.log('onFollowings');
  };

  const onStickers = () => {
    console.log('onStickers');
  };

  const onMyPicks = () => {
    console.log('onMyPicks');
  };

  const onPercorMatching = () => {
    console.log('onPercorMatching');
  };

  return (
    <ForegroundContainer style={foregroundStyle} height={height}>
      <CircleImage size={100} image={profileImage} />
      <Text color="#ffffff" bold fontSize={17} marginTop={20}>
        {nickname}
      </Text>
      <RowContainer marginTop={10}>
        <TextButton
          onPress={onFollowers}
          marginRight>{`팔로워 ${followers}`}</TextButton>
        <TextButton
          onPress={onFollowings}
          marginRight>{`팔로잉 ${followings}`}</TextButton>
        <TextButton onPress={onStickers}>{`잼스티커 ${stickers}`}</TextButton>
      </RowContainer>
      <RowContainer marginTop={25}>
        <BorderButton onPress={onMyPicks} marginRight>
          나의 찜
        </BorderButton>
        <BorderButton onPress={onPercorMatching}>퍼컬 매칭</BorderButton>
      </RowContainer>
    </ForegroundContainer>
  );
};

const Controls = () => {
  const {top} = useSafeAreaInsets();

  const onFriends = () => {
    console.log('onFriends');
  };

  const onEdit = () => {
    console.log('onEdit');
  };

  const onAlarms = () => {
    console.log('onAlarms');
  };

  const onMenu = () => {
    console.log('onMenu');
  };

  return (
    <ControlsContainer top={top}>
      <TouchableWithoutFeedback onPress={onFriends}>
        <AntDesign name="adduser" size={20} color="#ffffff" />
      </TouchableWithoutFeedback>

      <RightControlsContiainer>
        <BorderButton marginRight onPress={onEdit}>
          수정
        </BorderButton>
        <TouchableWithoutFeedback onPress={onAlarms}>
          <MaterialCommunityIcons
            name="bell-ring-outline"
            size={20}
            color="#ffffff"
            style={{marginRight: 15}}
          />
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onMenu}>
          <MaterialCommunityIcons name="menu" size={20} color="#ffffff" />
        </TouchableWithoutFeedback>
      </RightControlsContiainer>
    </ControlsContainer>
  );
};

const TextButton = ({children, marginRight, onPress}: ButtonProps) => {
  return (
    <TextButtonOrigin
      color="#ffffff"
      marginRight={marginRight ? 15 : 0}
      fontSize={14}
      bold
      onPress={onPress}>
      {children}
    </TextButtonOrigin>
  );
};

const BorderButton = ({children, marginRight, onPress}: ButtonProps) => {
  return (
    <BorderButtonOrigin
      color="#ffffff"
      height={30}
      borderRadius={15}
      marginRight={marginRight ? 15 : 0}
      paddingHorizontal={15}
      onPress={onPress}>
      {children}
    </BorderButtonOrigin>
  );
};

const Container = styled(Animated.View)<{height: number}>`
  width: 100%;
  height: ${props => props.height}px;
  background-color: #ffffff;
`;

const BackgroundImageContainer = styled.View`
  justify-content: center;
  align-items: center;
`;

const Dim = styled.View<{height: number}>`
  position: absolute;
  width: 100%;
  height: ${props => props.height}px;
  background-color: #000000;
  opacity: 0.3;
`;

const ForegroundContainer = styled(Animated.View)<{height: number}>`
  position: absolute;
  width: 100%;
  height: ${props => props.height}px;
  justify-content: center;
  align-items: center;
`;

const RowContainer = styled(RowContainerOrigin)`
  justify-content: center;
`;

const ControlsContainer = styled(RowContainerOrigin)<{top: number}>`
  position: absolute;
  top: ${props => props.top}px;
  padding: 15px;
  justify-content: space-between;
`;

const RightControlsContiainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export default Profile;
