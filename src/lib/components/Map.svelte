<script lang="ts">
  import { onMount } from 'svelte';
  import { pottyList } from '../utils/stores';
  import maplibregl from 'maplibre-gl';

  let map;
  let userLocation = { latitude: 0, longitude: 0 };

  onMount(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocation.latitude = position.coords.latitude;
        userLocation.longitude = position.coords.longitude;

        map = new maplibregl.Map({
          container: 'map', // container ID
          style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c`, // style URL
          center: [userLocation.longitude, userLocation.latitude], // starting position [lng, lat]
          zoom: 13 // starting zoom
        });

        new maplibregl.Marker({ color: 'red' })
          .setLngLat([userLocation.longitude, userLocation.latitude])
          .addTo(map);

        $pottyList.forEach(potty => {
          new maplibregl.Marker()
            .setLngLat([potty.longitude, potty.latitude])
            .setPopup(new maplibregl.Popup().setHTML(`<h3>${potty.pottyName}</h3><p>${potty.pottyAddress.formatted}</p><p>${potty.pottyRule}</p><p>${potty.pottyNotes}</p>`))
            .addTo(map);
        });
      });
    }
  });
</script>

<div id="map" style="width: 100%; height: 500px;"></div>

<style>
  /* Add relevant styling here */
</style>
