<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import Form from '$lib/components/Form.svelte';
  import type { Potty } from '$lib/types';
  import { getMapStyleUrl } from '$lib/utils/geoapify';
  import { GeoapifyGeocoderAutocomplete } from '@geoapify/geocoder-autocomplete';
  import '@geoapify/geocoder-autocomplete/styles/minimal.css';

  let potties: Potty[] = [];
  let showForm = false;
  let userLocation = { latitude: 0, longitude: 0 };
  let map: maplibregl.Map;
  let autocomplete;

  async function fetchPotties() {
    const response = await fetch('/api/potties');
    if (!response.ok) throw new Error('Failed to fetch potties');
    return response.json();
  }

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const φ1 = lat1 * Math.PI/180; // φ, λ in radians
    const φ2 = lat2 * Math.PI/180;
    const Δφ = (lat2-lat1) * Math.PI/180;
    const Δλ = (lon1-lon2) * Math.PI/180;

    const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ/2) * Math.sin(Δλ/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

    const d = R * c; // in metres
    return d;
  }

  function sortPottiesByDistance() {
    potties.sort((a, b) => {
      const distanceA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
      const distanceB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
      return distanceA - distanceB;
    });
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
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true,
      showUserLocation: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    map.on('load', () => {
      geolocateControl.trigger();
    });

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      userLocation = { latitude, longitude };
      map.setCenter([longitude, latitude]);
      sortPottiesByDistance();
      addPottyMarkers();
    });
  }

  function addPottyMarkers() {
    potties.forEach((potty) => {
      new maplibregl.Marker({ color: 'red' })
        .setLngLat([potty.longitude, potty.latitude])
        .addTo(map)
        .getElement().addEventListener('click', () => handleMarkerClick(potty));
    });
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

  function initializeAutocomplete() {
    autocomplete = new GeoapifyGeocoderAutocomplete(
      document.getElementById("autocomplete"),
      "YOUR_API_KEY",
      { proximity: `${userLocation.latitude},${userLocation.longitude}` }
    );

    autocomplete.on('select', (location) => {
      console.log(location);
    });

    autocomplete.on('suggestions', (suggestions) => {
      console.log(suggestions);
    });
  }

  onMount(() => {
    initializeAutocomplete();
  });
</script>

<main class="container mx-auto p-4 flex flex-col items-center">
  <div class="w-full max-w-3xl h-full flex flex-col bg-gray-100 rounded-lg overflow-hidden">
    <div id="map" class="map-container h-3/4"></div>
    <input id="autocomplete" type="text" class="form-input mt-4" placeholder="Search for a location" />
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
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyName}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyAddress}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyRule}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyNotes}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <button on:click={toggleForm} class="bg-gray-200 text-black px-4 py-2 rounded-md mt-4 absolute top-4 left-1/2 transform -translate-x-1/2">Add Potty</button>
  {#if showForm}
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-lg shadow-lg w-96">
        <Form on:closeForm={closeForm} />
      </div>
    </div>
  {/if}
</main>

<style>
  main {
    height: 100vh;
  }
  .map-container {
    height: 75%;
    width: 100%;
  }
  .table-container {
    height: 25%;
    width: 100%;
  }
  .form-input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
</style>
