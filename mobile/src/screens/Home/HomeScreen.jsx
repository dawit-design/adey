import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import globalStyles from '../../styles/theme';
import styles from './styles';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.heroCard}>
        <Text style={styles.header}>Welcome to Adey Travels</Text>
        <Text style={styles.body}>Find curated experiences, highlights, and new destinations in one place.</Text>
      </View>

      <TouchableOpacity
        style={[globalStyles.buttonPrimary, { marginTop: 20 }]}
        onPress={() => navigation.navigate('HomeMain')}
      >
        <Text style={globalStyles.buttonPrimaryText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}
