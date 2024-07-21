<script lang="ts">
  import { initializeStores } from '@skeletonlabs/skeleton';
  import '../app.postcss';

  initializeStores(); // Ensure stores are initialized properly
</script>

<svelte:head>
  <title>MapTiles+Map Libre GL</title>
  <link rel="stylesheet" href="https://cdn.skypack.dev/maplibre-gl/dist/maplibre-gl.css">
</svelte:head>

<slot />
