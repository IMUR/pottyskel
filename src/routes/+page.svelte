<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import Form from '$lib/components/Form.svelte';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';

  let potties: Potty[] = [];
  let showForm = false;

  async function fetchPotties() {
    const response = await fetch('/api/potties');
    if (!response.ok) throw new Error('Failed to fetch potties');
    return response.json();
  }

  onMount(async () => {
    try {
      potties = await fetchPotties();
      initializeMap();
    } catch (error) {
      console.error('Error fetching potties:', error);
    }
  });

  let map: maplibregl.Map;

  function initializeMap() {
    map = new maplibregl.Map({
      container: 'map-container',
      style: getMapStyleUrl(),
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

      geolocateControl.on('geolocate', (e) => {
        const { longitude, latitude } = e.coords;
        map.setCenter([longitude, latitude]);
        new maplibregl.Marker({ color: 'blue' })
          .setLngLat([longitude, latitude])
          .addTo(map);
      });

      potties.forEach((potty) => {
        new maplibregl.Marker({ color: 'red' })
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);
      });
    });
  }

  function toggleForm() {
    showForm = !showForm;
  }

  function closeForm() {
    showForm = false;
  }
</script>

<main class="container mx-auto p-4 flex flex-col items-center">
  <div class="w-full max-w-3xl h-full flex flex-col bg-gray-100 rounded-lg overflow-hidden">
    <div id="map-container" class="map-container"></div>
    <div class="table-container w-full overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Address
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Rule
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Notes
            </th>
            <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each potties as potty}
            <tr>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyName}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyAddress}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyRule}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyNotes}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyType}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <button on:click={toggleForm} class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Add Potty</button>
  {#if showForm}
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-lg shadow-lg w-96">
        <Form on:closeForm={closeForm} />
      </div>
    </div>
  {/if}
</main>

<style>
  .map-container {
    height: 70%;
    width: 100%;
    position: relative;
    border-radius: 0.375rem; /* Tailwind rounded-lg equivalent */
    overflow: hidden;
  }

  .table-container {
    height: 30%;
    width: 100%;
    position: relative;
    border-radius: 0.375rem; /* Tailwind rounded-lg equivalent */
    overflow-y: auto;
  }

  main {
    height: 100vh;
  }
</style>
