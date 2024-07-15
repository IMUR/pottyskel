<script lang="ts">
  import { onMount } from 'svelte';
  import { potties } from '$lib/utils/stores';

  let pottyList: any[] = [];

  // Fetch potties data from the store
  onMount(() => {
    potties.subscribe((value: any) => {
      pottyList = value;
    });
  });
</script>

<ul>
  {#each pottyList as potty}
    <li>
      <h3>{potty.pottyName}</h3>
      <p>{potty.pottyAddress}</p>
      <p>Rule: {potty.pottyRule}</p>
      <p>Notes: {potty.pottyNotes}</p>
      <p>Type: {potty.pottyType}</p>
    </li>
  {/each}
</ul>

<style>
  /* Add necessary styles */
</style>
