<script lang="ts">
  import { onMount } from 'svelte';
  import { pottyList } from '../utils/stores';
  import { writable } from 'svelte/store';

  const sortedPotties = writable([]);

  onMount(() => {
    const userLocation = { latitude: 0, longitude: 0 };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocation.latitude = position.coords.latitude;
        userLocation.longitude = position.coords.longitude;

        const sorted = $pottyList.map(potty => {
          const distance = calculateDistance(userLocation.latitude, userLocation.longitude, potty.latitude, potty.longitude);
          return { ...potty, distance };
        }).sort((a, b) => a.distance - b.distance);

        sortedPotties.set(sorted);
      });
    }
  });

  function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  }
</script>

<ul>
  {#each $sortedPotties as potty}
    <li>
      <h3>{potty.pottyName}</h3>
      <p>{potty.pottyAddress.formatted}</p>
      <p>{potty.pottyRule}</p>
      <p>{potty.pottyNotes}</p>
      <p>{potty.pottyType}</p>
      <p>{potty.distance.toFixed(2)} km away</p>
    </li>
  {/each}
</ul>
