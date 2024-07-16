<script lang="ts">
  import { onMount } from 'svelte';
  import Map from '$lib/components/Map.svelte';
  import List from '$lib/components/List.svelte';
  import { drawerStore } from '@skeletonlabs/skeleton';
  import { getPotties } from '$lib/utils/api';

  let potties = [];

  onMount(async () => {
    potties = await getPotties();
  });

  function openDrawer() {
    drawerStore.open({ id: 'pottyForm' });
  }
</script>

<main class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Potty Snitch</h1>
  <div class="flex flex-col md:flex-row">
    <div class="md:w-1/2 p-4">
      <Map {potties} />
    </div>
    <div class="md:w-1/2 p-4">
      <button on:click={openDrawer} class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Add Potty</button>
      <List {potties} />
    </div>
  </div>
</main>
