import { File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, Button, Image, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';

import { usePlaces } from '@/lib/places-context';

export default function PlaceDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { places, setPlacePhoto, removePlace, storageStatus } = usePlaces();
  const [message, setMessage] = useState('');
  const [takingPhoto, setTakingPhoto] = useState(false);
  const place = places.find((entry) => entry.id === id);

  if (storageStatus === 'loading') {
    return <Text style={styles.content}>Loading places…</Text>;
  }

  if (!place) {
    return <Text style={styles.content}>That place is no longer here.</Text>;
  }

  const placeId = place.id;

  async function takePhoto() {
    if (Platform.OS === 'web') {
      setMessage('Open Wanderlist on Android or iOS to take a photo.');
      return;
    }

    setMessage('');
    setTakingPhoto(true);

    try {
      const permission = await ImagePicker.requestCameraPermissionsAsync();

      if (!permission.granted) {
        setMessage(
          permission.canAskAgain
            ? 'Camera permission was denied. Tap Take photo to try again.'
            : 'Camera permission was denied. Allow Camera access in the app settings to try again.'
        );
        return;
      }

      const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.7 });

      if (result.canceled || !result.assets[0]) return;

      // Keep the photo in app storage so its URI still works after cache cleanup.
      const capturedPhoto = new File(result.assets[0].uri);
      const savedPhoto = new File(Paths.document, `wanderlist-${Date.now()}-${capturedPhoto.name}`);
      await capturedPhoto.copy(savedPhoto);
      setPlacePhoto(placeId, savedPhoto.uri);
    } catch (error) {
      console.error('Could not take a photo:', error);
      setMessage('Could not take a photo. Please try again.');
    } finally {
      setTakingPhoto(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.content}>
      <Text style={styles.name}>{place.name}</Text>
      <Text style={styles.text}>Category: {place.category}</Text>
      {place.notes ? <Text style={styles.text}>{place.notes}</Text> : null}

      {place.photoUri ? (
        <Image
          source={{ uri: place.photoUri }}
          style={styles.photo}
          accessibilityLabel={`Photo of ${place.name}`}
        />
      ) : null}

      <View style={styles.actions}>
        <Button title="Take photo" onPress={takePhoto} disabled={takingPhoto || storageStatus !== 'ready'} />
        {place.photoUri ? (
          <Button
            title="Remove photo"
            disabled={takingPhoto || storageStatus !== 'ready'}
            onPress={() => {
              setMessage('');
              setPlacePhoto(placeId, undefined);
            }}
          />
        ) : null}
      </View>

      <Button title="Remove this place" color="#b42318" disabled={takingPhoto || storageStatus !== 'ready'} onPress={() => {
        Alert.alert('Remove place?', `Remove ${place.name} from your list?`, [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Remove', style: 'destructive', onPress: () => removePlace(placeId) },
        ]);
      }} />

      {message ? <Text accessibilityRole="alert" style={styles.text}>{message}</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    gap: 14,
    backgroundColor: '#f1f7f5',
    flexGrow: 1,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#174d45',
  },
  text: {
    fontSize: 16,
    color: '#173d35',
  },
  photo: {
    width: '100%',
    height: 260,
    borderRadius: 12,
  },
  actions: {
    gap: 8,
  },
});
