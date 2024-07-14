<script>
  import Form from '$lib/components/Form.svelte';
  import List from '$lib/components/List.svelte';
  import Map from '$lib/components/Map.svelte';
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