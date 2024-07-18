<!-- <script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import type { Potty } from '$lib/types';

  export let potties: Potty[];

  let map: maplibregl.Map;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: `https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c`,
      center: [0, 0],
      zoom: 2
    });

    const navControl = new maplibregl.NavigationControl();
    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    // Trigger geolocation on map load
    map.on('load', () => {
      geolocateControl.trigger();
    });

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      map.setCenter([longitude, latitude]);
      new maplibregl.Marker()
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

<div class="map-list-container">
  <div id="map" class="map-container"></div>
  <ul class="list-container">
    {#each potties as potty}
      <li>
        <h3>{potty.pottyName}</h3>
        <p>{potty.pottyAddress}</p>
        <p>{potty.pottyRule}</p>
        <p>{potty.pottyNotes}</p>
        <p>{potty.pottyType}</p>
      </li>
    {/each}
  </ul>
</div>

<style>
  .map-list-container {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  .map-container {
    flex: 1 1 70%;
    border-bottom: 1px solid #ccc; /* Optional: adds a separator between map and list */
    height: 70%;
    width: 100%;
  }

  .list-container {
    flex: 1 1 30%;
    overflow-y: auto;
    padding: 1rem;
    border-top: 1px solid #ccc;
  }

  .list-container li {
    margin-bottom: 1rem;
  }

  #map {
    height: 100%;
    width: 100%;
  }

  .maplibregl-ctrl-top-right {
    top: 10px; /* Adjust position if needed */
    right: 10px;
  }
</style>
 -->