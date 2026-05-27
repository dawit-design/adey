import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function DiscoverScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover</Text>
      <Text style={styles.text}>Explore destinations, local guides, and top experiences in Ethiopia.</Text>
    </View>
  );
}
