import React from 'react';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';

const FavouriteIcon = ({ isActive, onPress }) => (
  <TouchableOpacity style={styles.container} onPress={onPress}>
    {isActive
      ? <AntDesign name="heart" size={32} color="#ff5263"/>
      : <AntDesign name="hearto" size={32} color="#aaa"/>
    }
  </TouchableOpacity>
);

export default FavouriteIcon;