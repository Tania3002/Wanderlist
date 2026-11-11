import { useRouter } from 'expo-router';
import { Alert, Button, StyleSheet, Text, View } from 'react-native';
import { usePlaces } from '@/lib/places-context';

export default function SettingsScreen() {
  const { resetPlaces, storageStatus } = usePlaces();
  const router = useRouter();
  function confirmReset() {
    Alert.alert('Reset places?', 'This will replace your list with the three starting places.', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Reset', style: 'destructive', onPress: () => { resetPlaces(); router.back(); } },
    ]);
  }
  return <View style={styles.container}>
    <Text style={styles.title}>Settings</Text>
    <Text style={styles.description}>Restore Banff, Paris and Montreal. Your other places will be removed.</Text>
    <Button title="Reset to the starting places" color="#b42318" onPress={confirmReset} disabled={storageStatus !== 'ready'} />
  </View>;
}
const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, gap: 18, backgroundColor: '#f1f7f5' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#174d45' },
  description: { fontSize: 16, color: '#173d35' },
});
