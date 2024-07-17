<script lang="ts">
  import { onMount } from 'svelte';
  import type { Potty } from '$lib/types';

  export let potties: Potty[] = [];

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const toRad = (value: number): number => (value * Math.PI) / 180;
    const R = 6371; // km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  let userLocation: { latitude: number; longitude: number } = { latitude: 0, longitude: 0 };

  onMount(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocation = position.coords;
        sortedPotties = potties.sort((a, b) => {
          const distanceA = getDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
          const distanceB = getDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
          return distanceA - distanceB;
        });
      });
    }
  });

  let sortedPotties = potties;
</script>

<ul class="list-disc pl-5">
  {#each sortedPotties as potty}
    <li class="mb-2">
      <h3 class="text-lg font-bold">{potty.pottyName}</h3>
      <p>{potty.pottyAddress}</p>
      <p>{potty.pottyRule}</p>
      <p>{potty.pottyNotes}</p>
      <p>{potty.pottyType}</p>
    </li>
  {/each}
</ul>
