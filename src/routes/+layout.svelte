<script lang="ts">
  import '../app.postcss';

  // Floating UI for Popups
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup, Drawer, drawerStore, initializeStores } from '@skeletonlabs/skeleton';
  import Form from '$lib/components/Form.svelte';

  // Initialize stores
  initializeStores();

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Drawer>
  {#if $drawerStore.id === 'pottyForm'}
    <Form />
  {/if}
</Drawer>

<slot />
