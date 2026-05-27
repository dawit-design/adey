import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function PlaceDetailScreen({ route }) {
  const { placeId } = route.params || {};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Place Detail</Text>
      <Text style={styles.body}>Details for place: {placeId || 'Explore a destination first'}.</Text>
    </View>
  );
}
