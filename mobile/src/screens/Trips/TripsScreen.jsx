import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

export default function TripsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trips</Text>
      <Text style={styles.text}>Your planned journeys and upcoming itineraries will show here.</Text>
    </View>
  );
}
