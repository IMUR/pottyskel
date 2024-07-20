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
      trackUserLocation: true,
      showUserLocation: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    map.on('load', () => {
      geolocateControl.trigger();
      addMarkers();
    });

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      map.setCenter([longitude, latitude]);
      new maplibregl.Marker({ color: 'blue' })
        .setLngLat([longitude, latitude])
        .addTo(map);
    });
  }

  function addMarkers() {
    potties.forEach((potty) => {
      if (isValidCoordinate(potty)) {
        const marker = new maplibregl.Marker({ color: 'red' })
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);

        marker.getElement().style.cursor = 'pointer';
        marker.getElement().addEventListener('click', () => handleMarkerClick(potty));
      } else {
        console.error('Invalid coordinates for potty:', potty);
      }
    });
  }

  function isValidCoordinate(potty: Potty): boolean {
    return potty.latitude >= -90 && potty.latitude <= 90 && 
           potty.longitude >= -180 && potty.longitude <= 180;
  }

  function handleMarkerClick(potty: Potty) {
    const popupContent = `
      <div class="marker-flag">
        <div><strong>${potty.pottyName}</strong></div>
        <div><a href="https://www.openstreetmap.org/search?query=${encodeURIComponent(potty.pottyAddress)}" target="_blank">${potty.pottyAddress}</a></div>
        <div>${potty.pottyRule}</div>
        <div>${potty.pottyNotes}</div>
      </div>
    `;

    const popup = new maplibregl.Popup({ offset: 25 })
      .setLngLat([potty.longitude, potty.latitude])
      .setHTML(popupContent)
      .addTo(map);
  }
</script>

<div id="my-map" class="map-container"></div>

<style>
  .map-container {
    height: 100%;
    width: 100%;
  }

  .marker-flag {
    background: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  .marker-flag a {
    color: #007bff;
    text-decoration: none;
  }

  .marker-flag a:hover {
    text-decoration: underline;
  }
</style>
