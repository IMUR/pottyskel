<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';

  onMount(() => {
    const map = new maplibregl.Map({
      container: 'map',
      style: 'https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c',
      center: [0, 0], // Initial center will be updated with geolocation
      zoom: 2 // Initial zoom level before geolocation
    });

    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    });

    const navControl = new maplibregl.NavigationControl({
      visualizePitch: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      map.setCenter([longitude, latitude]);
      map.setZoom(12);
    });

    map.on('load', () => {
      geolocateControl.trigger();
    });
  });
</script>

<main>
  <div id="map" style="height: 100vh; width: 100%;"></div>
</main>

<style>
  #map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
  }
</style>
