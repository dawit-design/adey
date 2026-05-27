import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved</Text>
      <Text style={styles.text}>Saved places and favorites are stored here for quick access.</Text>
    </View>
  );
}
