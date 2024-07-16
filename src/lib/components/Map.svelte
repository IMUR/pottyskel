<script>
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import 'maplibre-gl/dist/maplibre-gl.css';
  import { potties } from '$lib/utils/stores';

  let map;
  let mapContainer;

  function initializeMap() {
    map = new maplibregl.Map({
      container: mapContainer,
      style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=${import.meta.env.VITE_GEOAPIFY_API_KEY}`,
      center: [0, 0],
      zoom: 13
    });

    $potties.forEach(potty => {
      new maplibregl.Marker()
        .setLngLat([potty.longitude, potty.latitude])
        .setPopup(new maplibregl.Popup().setText(`${potty.pottyName} - ${potty.pottyAddress}`))
        .addTo(map);
    });
  }

  $: if (map) {
    map.eachLayer(layer => {
      if (layer instanceof maplibregl.Marker) {
        map.removeLayer(layer);
      }
    });
    $potties.forEach(potty => {
      new maplibregl.Marker()
        .setLngLat([potty.longitude, potty.latitude])
        .setPopup(new maplibregl.Popup().setText(`${potty.pottyName} - ${potty.pottyAddress}`))
        .addTo(map);
    });
  }

  onMount(initializeMap);
</script>

<div bind:this={mapContainer} class="w-full h-96"></div>

<style>
  .map-container {
    width: 100%;
    height: 100%;
  }
</style>
