<script lang="ts">
  import { potties } from '$lib/utils/stores';
</script>

<ul>
  {#each $potties as potty}
    <li>
      <strong>{potty.pottyName}</strong> - {potty.pottyAddress} ({potty.pottyRule})
      <p>{potty.pottyNotes}</p>
      <p>Type: {potty.pottyType}</p>
    </li>
  {/each}
</ul>
