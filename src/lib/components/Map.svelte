<script lang="ts">
  import { onMount } from 'svelte';
  import { potties } from '../utils/stores';
  import maplibregl from 'maplibre-gl';

  let map;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: 'https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c',
      center: [0, 0],
      zoom: 2,
    });

    $potties.forEach((potty) => {
      new maplibregl.Marker()
        .setLngLat([potty.longitude, potty.latitude])
        .setPopup(new maplibregl.Popup().setHTML(`<h3>${potty.pottyName}</h3><p>${potty.pottyAddress}</p>`))
        .addTo(map);
    });
  });
</script>

<div id="map" style="width: 100%; height: 400px;"></div>