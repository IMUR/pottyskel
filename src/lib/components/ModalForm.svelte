<script lang="ts">
  import type { SvelteComponent } from 'svelte';
  import { getModalStore } from '@skeletonlabs/skeleton';
  

  export let parent: SvelteComponent;

  const modalStore = getModalStore();

  // Form Data
  const formData = {
    name: '',
    tel: '',
    email: ''
  };

  function onFormSubmit(): void {
    if ($modalStore[0].response) $modalStore[0].response(formData);
    modalStore.close();
  }

  // Base Classes
  const cBase = 'card p-4 w-modal shadow-xl space-y-4';
  const cHeader = 'text-2xl font-bold';
  const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
</script>

{#if $modalStore[0]}
  <div class="modal-example-form {cBase}">
    <header class={cHeader}>{$modalStore[0].title ?? '(title missing)'}</header>
    <article>{$modalStore[0].body ?? '(body missing)'}</article>
    <form class="modal-form {cForm}" on:submit|preventDefault={onFormSubmit}>
      <label class="label">
        <span>Name</span>
        <input class="input" type="text" bind:value={formData.name} placeholder="Enter name..." />
      </label>
      <label class="label">
        <span>Phone Number</span>
        <input class="input" type="tel" bind:value={formData.tel} placeholder="Enter phone..." />
      </label>
      <label class="label">
        <span>Email</span>
        <input class="input" type="email" bind:value={formData.email} placeholder="Enter email address..." />
      </label>
      <footer class="modal-footer {parent.regionFooter}">
        <button type="button" class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button type="submit" class="btn {parent.buttonPositive}">Submit Form</button>
      </footer>
    </form>
  </div>
{/if}
