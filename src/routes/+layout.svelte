<script lang="ts">
  import '../app.postcss';
  import { initializeStores, Drawer, getDrawerStore } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
  import { storePopup } from '@skeletonlabs/skeleton';

  // Initialize stores for Skeleton components
  initializeStores();
  storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

  const drawerStore = getDrawerStore();
</script>

<Drawer>
  {#if $drawerStore.id === 'example-1'}
    <div>
      <h2>{$drawerStore.meta.title}</h2>
      <p>Here is the content for example-1 drawer.</p>
    </div>
  {:else}
    <p>Default Drawer Content</p>
  {/if}
</Drawer>

<slot />
