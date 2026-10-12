export type PlaceCategory = 'city' | 'nature' | 'food' | 'other';

export type Place = {
  id: string;
  name: string;
  category: PlaceCategory;
  notes?: string;
};
