export interface Potty {
  id: number;
  pottyName: string;
  pottyAddress: string;
  pottyRule: string;
  pottyNotes: string;
  pottyType: string;
  latitude: number;
  longitude: number;
}

export interface GeoapifyCoordinates {
  lat: number;
  lon: number;
}
