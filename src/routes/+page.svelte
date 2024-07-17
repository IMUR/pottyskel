<script lang="ts">
  import { onMount } from 'svelte';
  import Map from '$lib/components/Map.svelte';
  import List from '$lib/components/List.svelte';
  import Form from '$lib/components/Form.svelte';
  import { getDrawerStore, Drawer } from '@skeletonlabs/skeleton';
  import { getPotties } from '$lib/utils/api';
  import type { Potty } from '$lib/types';

  let potties: Potty[] = [];
  const drawerStore = getDrawerStore();

  async function fetchPotties() {
    const response = await fetch('/api/potties');
    if (!response.ok) throw new Error('Failed to fetch potties');
    return response.json();
  }

  onMount(async () => {
    try {
      potties = await fetchPotties();
    } catch (error) {
      console.error('Error fetching potties:', error);
    }
  });

  function openDrawer() {
    drawerStore.open({ id: 'pottyForm' });
  }
</script>

<main class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Potty Snitch</h1>
  <div class="flex flex-col md:flex-row bg-gray-100 rounded-lg overflow-hidden">
    <div class="md:w-1/2 p-4">
      <List {potties} />
    </div>
    <div class="md:w-1/2 p-4 h-96">
      <Map {potties} />
    </div>
  </div>
  <button on:click={openDrawer} class="bg-blue-500 text-white px-4 py-2 rounded-md mb-4">Add Potty</button>
</main>

<Drawer>
  {#if $drawerStore.id === 'pottyForm'}
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-blur-sm">
      <div class="bg-white p-4 rounded-lg shadow-lg">
        <Form />
      </div>
    </div>
  {/if}
</Drawer>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (min-width: 768px) {
    main {
      flex-direction: row;
    }
  }

  .container {
    max-width: 1200px;
  }
</style>
