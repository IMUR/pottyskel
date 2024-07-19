<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';
  import { getPotties } from '$lib/utils/api';

  let potties: Potty[] = [];
  let map: maplibregl.Map;

  onMount(async () => {
    try {
      potties = await getPotties();
      initializeMap();
    } catch (error) {
      console.error('Error fetching potties:', error);
    }
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
      addPottyMarkers();
    });

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      map.setCenter([longitude, latitude]);
    });
  }

  function addPottyMarkers() {
    potties.forEach(potty => {
      if (potty.latitude >= -90 && potty.latitude <= 90 && potty.longitude >= -180 && potty.longitude <= 180) {
        new maplibregl.Marker({ color: 'red' })
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);
      } else {
        console.error('Invalid coordinates for potty:', potty);
      }
    });
  }
</script>

<main class="container mx-auto p-4 flex flex-col items-center h-screen">
  <div class="w-full max-w-3xl h-full flex flex-col bg-gray-100 rounded-lg overflow-hidden">
    <div id="map" class="map-container flex-grow h-3/4"></div>
    <div class="table-container h-1/4 w-full overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each potties as potty}
            <tr>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyName}</td>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyAddress}</td>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyRule}</td>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyNotes}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</main>