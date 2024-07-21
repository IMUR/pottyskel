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

  .gradient-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 20%;
    pointer-events: none; /* Ensures the overlay doesn't interfere with user interactions */
    background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0));
    z-index: 1; /* Ensure the gradient is behind the list container */
  }
</style>

<slot />

<div class="gradient-overlay"></div>
