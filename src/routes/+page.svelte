<script lang="ts">
  import { onMount } from 'svelte';
  import Map from '$lib/components/Map.svelte';
  import Form from '$lib/components/Form.svelte';
  import type { Potty } from '$lib/types';

  let potties: Potty[] = [];
  let showForm = false;

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

  function toggleForm() {
    showForm = !showForm;
  }

  function closeForm() {
    showForm = false;
  }
</script>

<main class="container mx-auto p-4 flex flex-col items-center h-screen">
  <div class="w-full max-w-3xl h-full flex flex-col bg-gray-100 rounded-lg overflow-hidden">
    <Map {potties} />
    <div class="table-container h-1/4 w-full overflow-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          {#each potties as potty}
            <tr>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyName}</td>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyAddress}</td>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyRule}</td>
              <td class="px-6 py-4 text-sm text-gray-500 break-words">{potty.pottyNotes}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
  <button on:click={toggleForm} class="bg-blue-500 text-white px-4 py-2 rounded-md mt-4">Add Potty</button>
  {#if showForm}
    <div class="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-lg shadow-lg w-96">
        <Form on:closeForm={closeForm} />
      </div>
    </div>
  {/if}
</main>

<style>
  .table-container {
    height: 25%;
    width: 100%;
  }
</style>
