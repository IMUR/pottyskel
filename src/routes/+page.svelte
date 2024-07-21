<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import ModalForm from '$lib/components/ModalForm.svelte';
  import type { Potty } from '$lib/types';
  import { getModalStore } from '@skeletonlabs/skeleton';
  import type { ModalSettings, ModalComponent } from '@skeletonlabs/skeleton';

  let potties: Potty[] = [];
  let userLocation: { latitude: number; longitude: number } | null = null;
  let sortedPotties: Potty[] = [];
  let markers: { [key: string]: maplibregl.Marker } = {};
  let modalStore = getModalStore();

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
      container: 'map',
      style: `https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c`,
      center: [0, 0],
      zoom: 12
    });

    const navControl = new maplibregl.NavigationControl();
    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false,
      showUserLocation: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    map.on('load', () => {
      geolocateControl.trigger();

      geolocateControl.on('geolocate', (e) => {
        const { longitude, latitude } = e.coords;
        userLocation = { latitude, longitude };
        map.setCenter([longitude, latitude]);
        new maplibregl.Marker({ color: 'blue' })
          .setLngLat([longitude, latitude])
          .addTo(map);
        sortPottiesByDistance();
      });

      potties.forEach((potty: Potty) => {
        const marker = new maplibregl.Marker({ color: 'red' })
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);
        marker.getElement().addEventListener('click', () => {
          new maplibregl.Popup()
            .setLngLat([potty.longitude, potty.latitude])
            .setHTML(
              `<strong>${potty.pottyName}</strong><br><a href="https://www.google.com/maps/search/?api=1&query=${potty.pottyAddress}" target="_blank">${potty.pottyAddress}</a>`
            )
            .addTo(map);
        });
        markers[potty.pottyName] = marker;
      });
    });
  }

  function sortPottiesByDistance() {
    if (userLocation) {
      sortedPotties = [...potties].sort((a, b) => {
        const distanceA = getDistance(userLocation!.latitude, userLocation!.longitude, a.latitude, a.longitude);
        const distanceB = getDistance(userLocation!.latitude, userLocation!.longitude, b.latitude, b.longitude);
        return distanceA - distanceB;
      });
    } else {
      sortedPotties = potties;
    }
  }

  function getDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  function toggleForm() {
    modalStore.trigger({
      component: ModalForm as unknown as ModalComponent,
      modalClasses: 'max-w-lg',
      type: 'component'
    });
  }

  function closeForm() {
    modalStore.clear();
  }

  function handleButtonClick(potty: Potty) {
    map.flyTo({ center: [potty.longitude, potty.latitude], zoom: 15 });
    markers[potty.pottyName].getElement().click();
  }

  function centerOnUser() {
    if (userLocation) {
      map.flyTo({ center: [userLocation.longitude, userLocation.latitude], zoom: 12 });
    }
  }
</script>

<main class="relative flex items-center justify-center h-screen">
  <div class="relative w-full max-w-3xl h-full p-8 bg-gray-100 rounded-lg overflow-hidden">
    <div id="map" class="absolute inset-0 rounded-lg"></div>
    <div class="absolute inset-x-0 bottom-0 h-1/4 overflow-y-auto bg-transparent">
      {#each sortedPotties as potty}
        <button on:click={() => handleButtonClick(potty)} class="w-full p-2 bg-white text-black bg-opacity-70 hover:bg-opacity-90 rounded-md flex flex-row justify-evenly items-start mb-2">
          <span class="block font-bold truncate" style="font-size: calc(0.6em + 0.4vw)">{potty.pottyName}</span>
          <span class="block truncate" style="font-size: calc(0.5em + 0.3vw)">{potty.pottyAddress}</span>
          <span class="block truncate" style="font-size: calc(0.5em + 0.3vw)">{potty.pottyRule}</span>
          <span class="block truncate" style="font-size: calc(0.5em + 0.3vw)">{potty.pottyNotes}</span>
        </button>
      {/each}
    </div>
    <button on:click={toggleForm} class="absolute top-2 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-4 py-2 rounded-md">Add Potty</button>
    <button on:click={centerOnUser} class="absolute top-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-md">Center on User</button>
  </div>
</main>
