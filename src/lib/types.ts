import type {
  Map,
  Marker,
  LngLatLike,
  MapOptions,
  NavigationControl,
} from "maplibre-gl";

export type { Map, Marker, LngLatLike, MapOptions, NavigationControl };

export interface Potty {
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
