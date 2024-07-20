<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';

  export let potties: Potty[] = [];

  let map: maplibregl.Map;
  let popups: { [key: string]: maplibregl.Popup } = {}; // Store popups by marker ID

  onMount(() => {
    initializeMap();
  });

  function initializeMap() {
    map = new maplibregl.Map({
      container: 'map',
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
    });
  }

  function addMarkers() {
    potties.forEach((potty) => {
      if (isValidCoordinate(potty)) {
        const el = document.createElement('div');
        el.className = 'marker';
        el.style.backgroundColor = 'red';
        el.style.width = '20px';
        el.style.height = '20px';
        el.style.borderRadius = '50%';
        el.style.cursor = 'pointer';

        el.addEventListener('click', () => handleMarkerClick(potty));

        new maplibregl.Marker(el)
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);
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
    // Remove existing popup if present
    if (popups[potty.id]) {
      popups[potty.id].remove();
    }

    // Create a new popup
    const popup = new maplibregl.Popup({ offset: 25 })
      .setLngLat([potty.longitude, potty.latitude])
      .setHTML(`
        <div>
          <strong>${potty.pottyName}</strong><br>
          ${potty.pottyAddress}<br>
          ${potty.pottyRule}<br>
          ${potty.pottyNotes}
        </div>
      `)
      .addTo(map);

    // Store the popup in the popups object
    popups[potty.id] = popup;
  }
</script>

<div id="map" class="map-container"></div>

<style>
  .map-container {
    height: 100%;
    width: 100%;
  }

  .marker {
    cursor: pointer;
  }
</style>
