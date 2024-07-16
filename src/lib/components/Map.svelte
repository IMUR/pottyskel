<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';

  export let potties = [];

  let map;

  onMount(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      map = new maplibregl.Map({
        container: 'map',
        style: 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
        center: [longitude, latitude],
        zoom: 12,
      });

      potties.forEach((potty) => {
        new maplibregl.Marker()
          .setLngLat([potty.longitude, potty.latitude])
          .setPopup(new maplibregl.Popup().setHTML(`<h3>${potty.pottyName}</h3><p>${potty.pottyAddress}</p>`))
          .addTo(map);
      });
    });
  });
</script>

<div id="map" class="w-full h-96"></div>

<style>
  #map {
    width: 100%;
    height: 400px;
  }
</style>
