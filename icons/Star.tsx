import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Margin} from '../constants/type/View';

function Star(props: Margin) {
  return <AntDesign style={props} name="star" size={15} color="#f0d83e" />;
}

export default Star;
