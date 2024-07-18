<!-- <script lang="ts">
  import type { Potty } from '$lib/types';

  export let potties: Potty[];
</script>

<table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rule</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each potties as potty}
      <tr>
        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{potty.pottyName}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyAddress}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyRule}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyNotes}</td>
        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{potty.pottyType}</td>
      </tr>
    {/each}
  </tbody>
</table>
 -->