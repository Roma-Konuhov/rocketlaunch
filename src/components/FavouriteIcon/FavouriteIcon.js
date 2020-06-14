import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import styles from './styles';

const FavouriteIcon = ({ isActive, onPress, isTouchable = true }) => {
  const iconComponent = isActive
    ? <AntDesign name="heart" size={32} color="#ff5263" testID="icon-heart"/>
    : <AntDesign name="hearto" size={32} color="#90abd9" testID="icon-hearto"/>;

  if (!isTouchable) {
    return (
      <View style={styles.container} testID="untouchable-favourite-icon">
        {iconComponent}
      </View>
    );
  }

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} testID="touchable-favourite-icon">
      {iconComponent}
    </TouchableOpacity>
  );
};

export default FavouriteIcon;