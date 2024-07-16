<script lang="ts">
  import { pottyList } from '../utils/stores';
  import { onMount } from 'svelte';

  let userLocation = { latitude: 0, longitude: 0 };

  onMount(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocation.latitude = position.coords.latitude;
        userLocation.longitude = position.coords.longitude;
      });
    }
  });

  function calculateDistance(potty) {
    const R = 6371; // Radius of the Earth in km
    const dLat = (potty.latitude - userLocation.latitude) * (Math.PI / 180);
    const dLon = (potty.longitude - userLocation.longitude) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(userLocation.latitude * (Math.PI / 180)) * Math.cos(potty.latitude * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  }
</script>

<div>
  <h2>Nearby Potties</h2>
  <ul>
    {#each $pottyList.sort((a, b) => calculateDistance(a) - calculateDistance(b)) as potty}
      <li>
        <h3>{potty.pottyName}</h3>
        <p>{potty.pottyAddress.formatted}</p>
        <p>{potty.pottyRule}</p>
        <p>{potty.pottyNotes}</p>
        <p>{potty.pottyType}</p>
        <p>Distance: {calculateDistance(potty).toFixed(2)} km</p>
      </li>
    {/each}
  </ul>
</div>

<style>
  /* Add relevant styling here */
</style>
