import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';

const FavouriteIcon = ({ isActive, onPress, isTouchable = true }) => {
  const iconComponent = isActive
    ? <AntDesign name="heart" size={32} color="#ff5263"/>
    : <AntDesign name="hearto" size={32} color="#90abd9"/>;

  if (!isTouchable) {
    return (
      <View style={styles.container}>
        {iconComponent}
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} testID="favourite-icon">
      {iconComponent}
    </TouchableOpacity>
  );
};

export default FavouriteIcon;