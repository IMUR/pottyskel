<script lang="ts">
  import { initializeStores } from '@skeletonlabs/skeleton';
  import { onMount } from 'svelte';
  import '../app.postcss';

  onMount(() => {
    initializeStores();
  });
</script>

<svelte:head>
  <title>MapTiles+Map Libre GL</title>
  <link rel="stylesheet" href="https://cdn.skypack.dev/maplibre-gl/dist/maplibre-gl.css">
</svelte:head>

<slot />
