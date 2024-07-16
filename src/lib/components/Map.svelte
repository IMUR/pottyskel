<script lang="ts">
  import { onMount } from 'svelte';
  import { potties } from '../utils/stores';
  import maplibregl from 'maplibre-gl';

  interface Potty {
    latitude: number;
    longitude: number;
    pottyName: string;
    pottyAddress: string;
    pottyRule: string;
    pottyNotes: string;
    pottyType: string;
  }

  let map: maplibregl.Map;
  let markers: maplibregl.Marker[] = [];

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 2
    });

    navigator.geolocation.getCurrentPosition((position) => {
      const userMarker = new maplibregl.Marker()
        .setLngLat([position.coords.longitude, position.coords.latitude])
        .addTo(map);
      map.setCenter([position.coords.longitude, position.coords.latitude]);
      map.setZoom(14);
    });

    potties.subscribe((pottiesList: Potty[]) => {
      markers.forEach(marker => marker.remove());
      markers = pottiesList.map(potty => {
        const marker = new maplibregl.Marker()
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);
        marker.getElement().addEventListener('click', () => {
          const popup = new maplibregl.Popup()
            .setLngLat([potty.longitude, potty.latitude])
            .setHTML(`<h3>${potty.pottyName}</h3><p>${potty.pottyAddress}</p><p>${potty.pottyRule}</p><p>${potty.pottyNotes}</p><p>${potty.pottyType}</p>`)
            .addTo(map);
        });
        return marker;
      });
    });
  });
</script>

<style>
  #map {
    width: 100%;
    height: 100vh;
  }
</style>

<div id="map"></div>
