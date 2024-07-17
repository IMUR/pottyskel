<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl, { Map, Marker } from 'maplibre-gl';
  import type { Potty } from '$lib/types';

  export let potties: Potty[];

  let map: Map;
  let userMarker: Marker;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://demotiles.maplibre.org/style.json',
      center: [0, 0],
      zoom: 2
    });

    map.addControl(new maplibregl.NavigationControl());

    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      map.setCenter([longitude, latitude]);
      userMarker = new maplibregl.Marker()
        .setLngLat([longitude, latitude])
        .addTo(map);
    });

    potties.forEach((potty) => {
      const marker = new maplibregl.Marker()
        .setLngLat([potty.longitude, potty.latitude])
        .addTo(map);
      marker.getElement().addEventListener('click', () => {
        // Handle marker click
      });
    });
  });
</script>

<div id="map" class="w-full h-full"></div>

<style>
  #map {
    height: 100%;
    width: 100%;
  }
</style>
