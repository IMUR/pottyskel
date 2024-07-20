<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';

  export let potties: Potty[] = [];

  let map: maplibregl.Map;

  onMount(() => {
    initializeMap();
  });

  function initializeMap() {
    map = new maplibregl.Map({
      container: 'my-map',
      style: getMapStyleUrl(),
      center: [0, 0],
      zoom: 12
    });

    const navControl = new maplibregl.NavigationControl();
    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: false,
      showUserLocation: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    map.on('load', () => {
      geolocateControl.trigger();
      potties.forEach((potty) => {
        const el = document.createElement('div');
        el.className = 'marker';
        el.addEventListener('click', () => handleMarkerClick(potty));

        new maplibregl.Marker(el)
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);
      });
    });

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      map.setCenter([longitude, latitude]);
      new maplibregl.Marker({ color: 'blue' })
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
  }

  function handleMarkerClick(potty: Potty) {
    const popup = new maplibregl.Popup({ offset: 25 })
      .setLngLat([potty.longitude, potty.latitude])
      .setHTML(`
        <div>
          <strong>${potty.pottyName}</strong>
          <p>${potty.pottyAddress}</p>
          <p>${potty.pottyRule}</p>
          <p>${potty.pottyNotes}</p>
        </div>
      `)
      .addTo(map);
  }
</script>

<div id="my-map" class="map-container"></div>

<style>
  .map-container {
    height: 100%;
    width: 100%;
  }

  .marker {
    width: 25px;
    height: 25px;
    background-color: red;
    border-radius: 50%;
    cursor: pointer;
  }
</style>
