<script lang="ts">
  import { potties } from '../utils/stores';

  $: sortedPotties = $potties.sort((a, b) => a.distance - b.distance);
</script>

<ul>
  {#each sortedPotties as potty}
    <li>
      <h3>{potty.pottyName}</h3>
      <p>{potty.pottyAddress}</p>
      <p>{potty.pottyRule}</p>
      <p>{potty.pottyNotes}</p>
      <p>{potty.pottyType}</p>
    </li>
  {/each}
</ul>