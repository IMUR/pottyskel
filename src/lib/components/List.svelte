<script lang="ts">
  import { potties } from '../utils/stores';
  import { get } from 'svelte/store';

  interface Potty {
    distance: number;
    pottyName: string;
    pottyAddress: string;
    pottyRule: string;
    pottyNotes: string;
    pottyType: string;
  }

  let pottyList: Potty[] = get(potties);

  $: pottyList = get(potties);
</script>

<div class="p-4 space-y-4">
  {#each pottyList as potty}
    <div class="p-4 border rounded-lg shadow">
      <h3 class="text-xl font-bold">{potty.pottyName}</h3>
      <p>{potty.pottyAddress}</p>
      <p>{potty.pottyRule}</p>
      <p>{potty.pottyNotes}</p>
      <p>{potty.pottyType}</p>
      <p>{potty.distance} meters away</p>
    </div>
  {/each}
</div>
