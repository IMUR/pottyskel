<script lang="ts">
  import '../app.postcss';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup, Drawer, getDrawerStore, initializeStores } from '@skeletonlabs/skeleton';
  import Form from '$lib/components/Form.svelte';

  // Initialize stores
  initializeStores();
  const drawerStore = getDrawerStore();

  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  function openDrawer() {
    const drawerSettings = {
      id: 'pottyForm',
      bgDrawer: 'bg-white text-black', // Customize the background and text color
      bgBackdrop: 'bg-black/50', // Customize the backdrop color
      width: 'w-[90%] md:w-[50%]', // Customize the width
      padding: 'p-4', // Customize the padding
      rounded: 'rounded-lg' // Customize the border radius
    };
    drawerStore.open(drawerSettings);
  }
</script>

<Drawer>
  {#if $drawerStore.id === 'pottyForm'}
    <Form />
  {/if}
</Drawer>

<slot />
