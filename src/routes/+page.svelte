<script>
  import Form from '$lib/components/Form.svelte';
  import List from '$lib/components/List.svelte';
  import Map from '$lib/components/Map.svelte';
  import { onMount } from 'svelte';
  import { loadPotties } from '$lib/utils/stores';

  onMount(() => {
    loadPotties();
  });
</script>

<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Potty Skel</h1>
  <Form />
  <List />
  <Map />
</main>
