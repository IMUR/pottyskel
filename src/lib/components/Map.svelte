<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import { potties } from '$lib/utils/stores';

  let map: any;
  let pottyList: any[] = [];

  onMount(() => {
    // Initialize the map
    map = new maplibregl.Map({
      container: 'map', // container ID
      style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c`, // style URL
      center: [0, 0], // starting position [lng, lat]
      zoom: 2 // starting zoom
    });

    // Fetch potties data from the store
    potties.subscribe((value: any) => {
      pottyList = value;
      // Add markers to the map
      pottyList.forEach((potty: any) => {
        new maplibregl.Marker()
          .setLngLat([potty.longitude, potty.latitude])
          .setPopup(new maplibregl.Popup().setHTML(`<h3>${potty.pottyName}</h3><p>${potty.pottyAddress}</p>`))
          .addTo(map);
      });
    });
  });
</script>

<div id="map" style="width: 100%; height: 500px;"></div>

<style>
  #map {
    width: 100%;
    height: 500px;
  }
</style>
