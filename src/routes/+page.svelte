<script lang="ts">
  import Map from '$lib/components/Map.svelte';
  import List from '$lib/components/List.svelte';
  import Form from '$lib/components/Form.svelte';
</script>

<main class="container mx-auto p-4">
  <h1 class="text-3xl font-bold mb-4">Potty Snitch</h1>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/2">
      <Map />
    </div>
    <div class="w-full md:w-1/2">
      <List />
      <Form />
    </div>
  </div>
</main>
