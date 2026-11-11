import { Link } from 'expo-router';
import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PlaceCard from '@/components/PlaceCard';
import { usePlaces } from '@/lib/places-context';
import type { Place } from '@/lib/types';

const appName = 'Wanderlist';

export default function HomeScreen() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [nameError, setNameError] = useState('');
  const [notesError, setNotesError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const { places, addPlace, storageStatus } = usePlaces();

  function handleAddPlace() {
    const trimmedName = name.trim();
    const normalizedCategory = category.trim().toLowerCase();
    const validCategory =
      normalizedCategory === 'city' || normalizedCategory === 'nature' ||
      normalizedCategory === 'food' || normalizedCategory === 'other';

    setNameError(trimmedName ? '' : 'Please enter a place name.');
    setNotesError(notes.length > 200 ? 'Notes must be 200 characters or fewer.' : '');
    setCategoryError(validCategory ? '' : 'Enter city, nature, food or other.');

    if (!trimmedName || notes.length > 200 || !validCategory) return;

    const newPlace: Place = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: trimmedName,
      category: normalizedCategory,
      notes: notes.trim() || undefined,
    };
    addPlace(newPlace);
    setName('');
    setNotes('');
    setCategory('');
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Welcome to {appName}</Text>
        <Text style={styles.tagline}>Places I dream of visiting</Text>

        <Image
          source={{ uri: 'https://picsum.photos/600/300' }}
          style={styles.image}
        />

        <View style={styles.form}>
          <Text style={styles.heading}>Add a place</Text>

          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Place name"
            placeholder="e.g. Montreal"
            value={name}
            onChangeText={setName}
          />
          {nameError ? <Text style={styles.error} accessibilityRole="alert">{nameError}</Text> : null}

          <Text style={styles.label}>Notes (optional)</Text>
          <TextInput
            style={[styles.input, styles.notesInput]}
            accessibilityLabel="Place notes"
            placeholder="What would you like to do?"
            multiline
            value={notes}
            onChangeText={setNotes}
          />
          <Text style={styles.hint}>{notes.length}/200 characters</Text>
          {notesError ? <Text style={styles.error} accessibilityRole="alert">{notesError}</Text> : null}

          <Text style={styles.label}>Category</Text>
          <TextInput
            style={styles.input}
            accessibilityLabel="Place category"
            placeholder="city, nature, food or other"
            autoCapitalize="none"
            autoCorrect={false}
            value={category}
            onChangeText={setCategory}
          />
          {categoryError ? <Text style={styles.error} accessibilityRole="alert">{categoryError}</Text> : null}

          <Pressable
            style={styles.button}
            onPress={handleAddPlace}
            accessibilityRole="button"
            disabled={storageStatus === 'loading'}
          >
            <Text style={styles.buttonText}>Add place</Text>
          </Pressable>
        </View>

        <Link href="/settings" style={styles.settingsLink}>Settings · Reset places</Link>

        <View style={styles.headingRow}>
          <Text style={styles.heading}>My places</Text>
          <Text>{places.length} saved</Text>
        </View>

        {storageStatus === 'loading' && <Text>Loading places…</Text>}
        {storageStatus === 'failed' && (
          <Text style={styles.error}>Could not load saved places. Restart the app to try again.</Text>
        )}
        {places.map((place) => (
          <Link key={place.id} href={{ pathname: '/place/[id]', params: { id: place.id } }} asChild>
            <Pressable accessibilityRole="link" accessibilityLabel={`View ${place.name} details`}>
              <PlaceCard name={place.name} category={place.category} notes={place.notes} />
            </Pressable>
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f1f7f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#174d45',
  },
  tagline: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 170,
    borderRadius: 12,
    marginBottom: 20,
  },
  headingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  settingsLink: { color: '#174d45', fontSize: 16, fontWeight: '600', marginBottom: 18 },
  storageButtons: {
    gap: 8,
    marginBottom: 12,
  },
  form: {
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    marginTop: 14,
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#9eafa9',
    borderRadius: 8,
    padding: 12,
    color: '#173d35',
    backgroundColor: '#ffffff',
  },
  notesInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  hint: {
    fontSize: 12,
    color: '#52645d',
    marginTop: 4,
  },
  error: {
    color: '#b42318',
    marginTop: 4,
  },
  button: {
    backgroundColor: '#174d45',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 18,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});