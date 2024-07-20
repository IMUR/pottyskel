<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import Form from '$lib/components/Form.svelte';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';

  let potties: Potty[] = [];
  let showForm = false;
  let map: maplibregl.Map;
  let userLocation: { longitude: number; latitude: number } | null = null;

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
      userLocation = { longitude, latitude };
      map.setCenter([longitude, latitude]);
      sortPottiesByDistance();
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
    map.setCenter([potty.longitude, potty.latitude]);
    map.setZoom(15); // Adjust the zoom level as needed
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
    sortPottiesByDistance();
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

  function sortPottiesByDistance() {
    if (userLocation) {
      potties = [...potties].sort((a, b) => {
        const distanceA = calculateDistance(userLocation!.latitude, userLocation!.longitude, a.latitude, a.longitude);
        const distanceB = calculateDistance(userLocation!.latitude, userLocation!.longitude, b.latitude, b.longitude);
        return distanceA - distanceB;
      });
    }
  }

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }
</script>

<main class="container mx-auto p-4 flex flex-col items-center h-screen relative">
  <div id="map" class="flex-grow w-full rounded-xl"></div>
  <button on:click={toggleForm} class="add-potty-button absolute top-20 left-1/2 transform -translate-x-1/2">Add Potty</button>
  <div class="potty-list-container fixed bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 h-1/4 overflow-scroll flex flex-col items-center bg-gradient-to-t from-transparent to-white">
    {#each potties as potty}
      <button on:click={() => handleMarkerClick(potty)} class="potty-button m-2 p-2 w-full text-left">
        <div class="grid grid-cols-4 gap-3">
          <div class="font-semibold text-lg text-gray-800">{potty.pottyName}</div>
          <div class="text-sm text-gray-600">{potty.pottyAddress}</div>
          <div class="text-sm text-gray-600">{potty.pottyRule}</div>
          <div class="text-lg text-gray-600">{potty.pottyNotes}</div>
        </div>
      </button>
    {/each}
  </div>
  {#if showForm}
    <div class="form-backdrop fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div class="form-container p-4 rounded-lg shadow-lg w-96">
        <Form on:closeForm={closeForm} on:newPotty={handleNewPotty} />
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    height: 100vh;
  }

  .add-potty-button {
    background-color: rgba(211, 211, 211, 0.4); /* Light grey with 70% opacity */
    backdrop-filter: blur(5px); /* Blurred background */
    border: 2px solid #fff; /* White border */
    color: #000;
    padding: 2.5rem 2.5rem;
    border-radius: 1rem;
    font-size: 1.2rem;
    cursor: pointer;
    width: 300px; /* Set a fixed width */
    height: 60px; /* Set a fixed height */
    text-align: center;
    line-height: 0px; /* Vertically center text */
  }

  .add-potty-button:hover {
    background-color: rgba(165, 165, 165, 0.5); /* Slightly less transparent on hover */
  }

  .potty-list-container {
    background: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }

  .potty-button {
    height: 90px;
    background: none;
    backdrop-filter: blur(5px);
    border: 2px solid #fff;
    margin: 2px 0;
    width: calc(65% - 10px); /* Ensure buttons do not exceed the container */
    transition: transform 0.3s;
    overflow: hidden;
    background-color: rgba(211, 211, 211, 0.8); /* White background with opacity */
    border-radius: 8px; /* Rounded corners */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Subtle shadow */
    color: #333; /* Text color */
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .potty-button:hover {
    transform: scale(1.01);
    background-color: rgba(200, 200, 200, 0.9); /* Change background on hover */
  }

  .potty-button:active {
    transform: scale(0.95);
    background-color: rgba(180, 180, 180, 1); /* Change background on active */
  }

  .potty-button .grid {
    display: grid;
    grid-template-columns: 18% 50% 10% 15%;
    align-items: center;
    width: 100%;
    white-space: wrap;
  }

  .potty-button .grid > div {
    overflow: auto;
    text-overflow: initial;
    white-space: wrap;
  }

  .form-backdrop {
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black */
    backdrop-filter: blur(10px); /* Blur effect */
  }

  .form-container {
    animation: fadeIn 0.3s ease-out, scaleIn 0.3s ease-out;
    background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
    backdrop-filter: blur(10px); /* Blur effect */
    padding: 2rem;
    border-radius: 1rem;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes scaleIn {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
</style>
