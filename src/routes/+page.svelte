<script>
  import Form from '$lib/components/Form.svelte';
  import List from '$lib/components/List.svelte';
  import Map from '$lib/components/Map.svelte';
  import { onMount } from 'svelte';
  import { potties } from '$lib/utils/stores';

  export let data;

  potties.set(data.potties);

  onMount(() => {
    // Perform any additional setup if necessary
  });
</script>

<main>
  <h1>Potty Skel</h1>
  <Form />
  <List />
  <Map />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
</style>
