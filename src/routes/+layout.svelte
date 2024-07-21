<script>
  import '../app.postcss';
</script>

<svelte:head>
  <title>MapTiles+Map Libre GL</title>
  <link rel="stylesheet" href="https://cdn.skypack.dev/maplibre-gl/dist/maplibre-gl.css">
</svelte:head>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }
</style>

<slot />
