<script lang="ts">
	import '../app.postcss';

	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, Drawer, drawerStore } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<Drawer>
  {#if $drawerStore.id === 'pottyForm'}
    <Form />
  {/if}
</Drawer>

<slot />
