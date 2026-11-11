import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Place } from './types';

const KEY = 'wanderlist-places';

export async function savePlaces(places: Place[]): Promise<void> {
  await AsyncStorage.setItem(KEY, JSON.stringify(places));
}

export async function loadPlaces(): Promise<Place[] | null> {
  const saved = await AsyncStorage.getItem(KEY);

  if (saved === null) {
    return null;
  }

  return JSON.parse(saved) as Place[];
}
