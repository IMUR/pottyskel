<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';

  export let potties: Potty[] = [];
  let map: maplibregl.Map;
  let popup: maplibregl.Popup | null = null;

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
    });
  }

  function addMarkers() {
    potties.forEach((potty) => {
      if (isValidCoordinate(potty)) {
        const marker = new maplibregl.Marker({ color: 'red' })
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map)
          .getElement();
          
        marker.style.cursor = 'pointer';

        marker.addEventListener('click', () => handleMarkerClick(potty));
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
    console.log('Potty clicked:', potty);
    if (popup) {
      popup.remove();
    }
    popup = new maplibregl.Popup({ offset: 25 })
      .setLngLat([potty.longitude, potty.latitude])
      .setHTML(`
        <div>
          <h3>${potty.pottyName}</h3>
          <p>${potty.pottyAddress}</p>
          <p>Rule: ${potty.pottyRule}</p>
          <p>Notes: ${potty.pottyNotes}</p>
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
</style>
