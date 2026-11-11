import { StyleSheet, Text, View } from 'react-native';
import type { Place } from '../lib/types';

type PlaceCardProps = Pick<Place, 'name' | 'category' | 'notes'>;

export default function PlaceCard({ name, category, notes }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text>{category}</Text>
      </View>
      {notes !== undefined ? <Text>{notes}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});