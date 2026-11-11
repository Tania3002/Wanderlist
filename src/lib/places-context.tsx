import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { loadPlaces, savePlaces } from './storage';
import type { Place } from './types';

const startingPlaces: Place[] = [
  { id: 'banff', name: 'Banff', category: 'nature', notes: 'See the mountains and Lake Louise.' },
  { id: 'paris', name: 'Paris', category: 'city', notes: 'Visit the Eiffel Tower and explore cafés.' },
  { id: 'montreal', name: 'Montreal', category: 'city', notes: 'Explore Old Montreal.' },
];

type PlacesValue = {
  places: Place[];
  addPlace: (place: Place) => void;
  setPlacePhoto: (id: string, photoUri: string | undefined) => void;
  removePlace: (id: string) => void;
  resetPlaces: () => void;
  storageStatus: 'loading' | 'ready' | 'failed';
};

const PlacesContext = createContext<PlacesValue | null>(null);

export function PlacesProvider({ children }: { children: ReactNode }) {
  const [places, setPlaces] = useState(startingPlaces);
  const [storageStatus, setStorageStatus] = useState<PlacesValue['storageStatus']>('loading');

  useEffect(() => {
    let active = true;

    loadPlaces()
      .then((savedPlaces) => {
        if (!active) return;

        if (savedPlaces !== null) {
          setPlaces(savedPlaces);
        }
        setStorageStatus('ready');
      })
      .catch((error) => {
        if (!active) return;

        setStorageStatus('failed');
        console.error('Could not load places:', error);
      });

    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (storageStatus !== 'ready') return;

    savePlaces(places).catch((error) => console.error('Could not save places:', error));
  }, [places, storageStatus]);

  function addPlace(place: Place) {
    setPlaces((currentPlaces) => [...currentPlaces, place]);
  }

  function setPlacePhoto(id: string, photoUri: string | undefined) {
    setPlaces((currentPlaces) =>
      currentPlaces.map((place) => (place.id === id ? { ...place, photoUri } : place))
    );
  }

  function removePlace(id: string) {
    setPlaces((current) => current.filter((place) => place.id !== id));
  }

  function resetPlaces() {
    setPlaces(startingPlaces.map((place) => ({ ...place })));
  }

  return (
    <PlacesContext.Provider value={{ places, addPlace, setPlacePhoto, removePlace, resetPlaces, storageStatus }}>
      {children}
    </PlacesContext.Provider>
  );
}

export function usePlaces() {
  const value = useContext(PlacesContext);

  if (value === null) {
    throw new Error('usePlaces must be used inside PlacesProvider');
  }

  return value;
}
