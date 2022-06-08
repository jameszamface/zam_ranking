import React from 'react';
import {FlatList, Text, View, Animated} from 'react-native';
import styled from 'styled-components/native';
import ParallaxScrolView from '@monterosa/react-native-parallax-scroll';
import {width} from '../constants';
import BorderButton from '../components/Button/BorderButton';

const profileHeight = width;

function MyZam() {
  return (
    <FlatList
      style={{flex: 1}}
      ListHeaderComponent={
        <View
          style={{
            width: '100%',
            height: 450,
            backgroundColor: 'yellow',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <BorderButton height={40} borderRadius={10}>Border Button</BorderButton>
        </View>
      }
      renderScrollComponent={() => (
        <ParallaxScrolView
          headerHeight={0}
          isHeaderFixed={false}
          parallaxHeight={profileHeight}
          fadeOutParallaxBackground
          renderParallaxBackground={({
            animatedValue, // [0~headerHeight]
          }: {
            animatedValue: Animated.Value;
          }) => {
            const opacity = animatedValue.interpolate({
              inputRange: [0, profileHeight],
              outputRange: [0, 1],
            });
            return (
              <Animated.View
                style={{
                  backgroundColor: '#ffffff',
                  position: 'absolute',
                  opacity,
                  height: profileHeight,
                  width: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#000000'}}>Parallax Background</Text>
              </Animated.View>
            );
          }}
          parallaxBackgroundScrollSpeed={5}
          parallaxForegroundScrollSpeed={5}
        />
      )}
      data={[1, 2, 3, 4, 5, 6]}
      bounces
      renderItem={() => (
        <View
          style={{
            height: 150,
            width: '100%',
            backgroundColor: 'blue',
            opacity: 0.5,
          }}
        />
      )}
    />
  );
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default MyZam;
