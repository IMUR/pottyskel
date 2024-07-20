<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import Form from '$lib/components/Form.svelte';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';

  let potties: Potty[] = [];
  let showForm = false;
  let map: maplibregl.Map;

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
        new maplibregl.Marker({ color: 'red' })
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map)
          .getElement().addEventListener('click', () => handleMarkerClick(potty));
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
  }

  function toggleForm() {
    showForm = !showForm;
  }

  function closeForm() {
    showForm = false;
  }

  function handleNewPotty(event: CustomEvent) {
    const newPotty: Potty = event.detail;
    potties = [...potties, newPotty];
    addNewPottyMarker(newPotty);
  }

  function addNewPottyMarker(potty: Potty) {
    if (isValidCoordinate(potty)) {
      new maplibregl.Marker({ color: 'red' })
        .setLngLat([potty.longitude, potty.latitude])
        .addTo(map)
        .getElement().addEventListener('click', () => handleMarkerClick(potty));
    } else {
      console.error('Invalid coordinates for potty:', potty);
    }
  }
</script>

<main class="container mx-auto p-4 flex flex-col items-center h-screen">
  <div class="w-full max-w-3xl h-full flex flex-col bg-gray-100 rounded-lg overflow-hidden relative">
    <div id="map" class="flex-grow h-3/4"></div>
    <button on:click={toggleForm} class="add-potty-button absolute top-2 left-1/2 transform -translate-x-1/2">Add Potty</button>
    <div class="flex-grow h-1/4 w-full overflow-auto">
      <table class="min-w-full divide-y divide-gray-200 table-auto">
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
  {#if showForm}
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-lg shadow-lg w-96">
        <Form on:closeForm={closeForm} on:newPotty={handleNewPotty} />
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    height: 100vh;
  }

  table {
    table-layout: auto;
  }

  th, td {
    white-space: normal; /* Allow text to wrap */
    word-wrap: break-word; /* Ensure long words break to the next line */
  }

  .add-potty-button {
    background-color: rgba(211, 211, 211, 0.4); /* Light grey with 70% opacity */
    backdrop-filter: blur(5px); /* Blurred background */
    border: 2px solid #fff; /* White border */
    color: #000;
    padding: 0.5rem 1rem;
    border-radius: 0.8rem;
    font-size: 1.2rem;
    cursor: pointer;
    width: 250px; /* Set a fixed width */
    height: 60px; /* Set a fixed height */
    text-align: center;
    line-height: 0px; /* Vertically center text */
  }

  .add-potty-button:hover {
    background-color: rgba(165, 165, 165, 0.5); /* Slightly less transparent on hover */
  }
</style>
