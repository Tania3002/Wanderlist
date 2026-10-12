import { useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import PlaceCard from '../components/PlaceCard';
import type { Place, PlaceCategory } from '../lib/types';

const appName = 'Wanderlist';
const categories: PlaceCategory[] = ['city', 'nature', 'food', 'other'];

const startingPlaces: Place[] = [
  { id: '1', name: 'Old Montreal', category: 'city', notes: 'Walk around the old streets and visit the Old Port.' },
  { id: '2', name: 'Mount Royal', category: 'nature', notes: 'A nice place to enjoy the view and spend time outside.' },
];

export default function HomeScreen() {
  const [places, setPlaces] = useState<Place[]>(startingPlaces);
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [nameError, setNameError] = useState('');
  const [notesError, setNotesError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  function addPlace() {
    const cleanName = name.trim();
    const cleanNotes = notes.trim();
    const cleanCategory = category.trim().toLowerCase();
    const validCategory = categories.find((item) => item === cleanCategory);

    const nextNameError = cleanName ? '' : 'Please enter a place name.';
    const nextNotesError = notes.length <= 200 ? '' : 'Notes must be 200 characters or fewer.';
    const nextCategoryError = validCategory ? '' : 'Choose city, nature, food, or other.';
    setNameError(nextNameError);
    setNotesError(nextNotesError);
    setCategoryError(nextCategoryError);
    if (nextNameError || nextNotesError || nextCategoryError || !validCategory) return;

    const newPlace: Place = {
      id: `${Date.now()}-${places.length}`,
      name: cleanName,
      category: validCategory,
      notes: cleanNotes || undefined,
    };
    setPlaces([...places, newPlace]);
    setName('');
    setNotes('');
    setCategory('');
    setNameError('');
    setNotesError('');
    setCategoryError('');
  }

  return (
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.title}>{appName}</Text>
        <Text style={styles.tagline}>Save the places you want to explore.</Text>
      </View>
      <Image
        source={{ uri: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' }}
        style={styles.image}
      />

      <Text style={styles.sectionTitle}>Add a place</Text>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} placeholder="Place name" value={name} onChangeText={setName} accessibilityLabel="Name" />
      {!!nameError && <Text style={styles.error}>{nameError}</Text>}

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput style={[styles.input, styles.notesInput]} placeholder="What would you like to do there?" multiline value={notes} onChangeText={setNotes} accessibilityLabel="Notes" />
      <Text style={styles.counter}>{notes.length}/200</Text>
      {!!notesError && <Text style={styles.error}>{notesError}</Text>}

      <Text style={styles.label}>Category</Text>
      <TextInput style={styles.input} placeholder="city, nature, food, or other" value={category} onChangeText={setCategory} autoCapitalize="none" accessibilityLabel="Category" />
      {!!categoryError && <Text style={styles.error}>{categoryError}</Text>}

      <Pressable style={styles.button} onPress={addPlace} accessibilityRole="button">
        <Text style={styles.buttonText}>Add Place</Text>
      </Pressable>

      <Text style={styles.sectionTitle}>My Places</Text>
      {places.map((place) => (
        <PlaceCard key={place.id} name={place.name} category={place.category} notes={place.notes} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, paddingBottom: 45 },
  header: { marginTop: 30, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold' },
  tagline: { fontSize: 16, marginTop: 5 },
  image: { width: '100%', height: 200, borderRadius: 12, marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  label: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#999', borderRadius: 9, padding: 12, fontSize: 16, marginBottom: 12 },
  notesInput: { minHeight: 85, textAlignVertical: 'top', marginBottom: 3 },
  counter: { textAlign: 'right', color: '#666', marginBottom: 10 },
  error: { color: '#b42318', marginBottom: 10 },
  button: { backgroundColor: '#245b4c', padding: 15, borderRadius: 9, alignItems: 'center', marginBottom: 25 },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
});
