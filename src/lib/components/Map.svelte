<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import { potties } from '$lib/utils/stores';

  let map;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://maps.geoapify.com/v1/styles/osm-bright/style.json?apiKey=YOUR_API_KEY',
      center: [longitude, latitude],
      zoom: 13
    });

    $potties.forEach(potty => {
      new maplibregl.Marker()
        .setLngLat([potty.longitude, potty.latitude])
        .addTo(map);
    });
  });
</script>

<div id="map" class="w-full h-screen"></div>
