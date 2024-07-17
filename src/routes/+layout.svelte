<script lang="ts">
  import '../app.postcss';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup, Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
  import Form from '$lib/components/Form.svelte';

  // Initialize stores
  initializeStores();
  const drawerStore = getDrawerStore();

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Drawer>
  {#if $drawerStore.id === 'pottyForm'}
    <Form />
  {/if}
</Drawer>

<slot />
