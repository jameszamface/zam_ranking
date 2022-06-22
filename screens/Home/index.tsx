/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import AutoHeightWebView from 'react-native-autoheight-webview';
import {html} from './data';
import {FlatList, TouchableWithoutFeedback} from 'react-native';
import {width} from '../../constants';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

function Home() {
  const [opacity, setOpacity] = useState(0.99);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setTimeout(() => {
        setOpacity(1);
      }, 750);
    }
    return () => {
      if (isFocused) setOpacity(0.99);
    };
  }, [isFocused]);

  return null;

  return (
    <FlatList
      removeClippedSubviews
      style={{opacity: 0.99}}
      data={['header', 'menu', 'webview']}
      renderItem={({item}) => {
        if (item === 'header') return <HeaderComponent />;
        if (item === 'menu') return <Menu />;
        return (
          <AutoHeightWebView
            // javaScriptEnabled={false}
            scrollEnabled={false}
            source={{
              html,
            }}
            style={{
              width,
              opacity,
              minHeight: 1,
            }}
            customStyle={`
						* {
							width: 100%;
						}
					`}
            viewportContent="width=device-width, user-scalable=no"
          />
        );
      }}
      stickyHeaderIndices={[1]}
    />
  );
}

const Header = styled.View`
  width: 100%;
  height: 250px;
  background-color: blue;
`;

const HeaderComponent = () => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Dummy')}>
      <Header />
    </TouchableWithoutFeedback>
  );
};

const Menu = styled.View`
  width: 100%;
  height: 50px;
  background-color: yellow;
`;

export default Home;
