import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import PlaceCard from '../components/PlaceCard';

const appName = 'Wanderlist';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{appName}</Text>
        <Text style={styles.tagline}>
          Save the places you want to explore.
        </Text>
      </View>

      <Image
        source={{
          uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee',
        }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>My Places</Text>

      <PlaceCard
        name="Old Montreal"
        category="Sightseeing"
        notes="Walk around the old streets and visit the Old Port."
      />

      <PlaceCard
        name="Mount Royal"
        category="Nature"
        notes="A nice place to enjoy the view and spend time outside."
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    marginTop: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  tagline: {
    fontSize: 16,
    marginTop: 5,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});