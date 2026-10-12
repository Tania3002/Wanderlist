import { StyleSheet, Text, View } from 'react-native';
import type { Place } from '../lib/types';

type PlaceCardProps = Pick<Place, 'name' | 'category' | 'notes'>;

export default function PlaceCard({ name, category, notes }: PlaceCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.category}>{category}</Text>
      </View>
      {notes !== undefined && <Text style={styles.notes}>{notes}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: { padding: 16, marginBottom: 14, borderWidth: 1, borderRadius: 12 },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 18, fontWeight: 'bold', flexShrink: 1 },
  category: { fontSize: 14, marginLeft: 8 },
  notes: { fontSize: 15, marginTop: 10 },
});
