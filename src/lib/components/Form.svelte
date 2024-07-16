<!-- src/lib/components/Form.svelte -->
<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fetchSuggestions, submitPotty } from '$lib/utils/api';
    import { potties } from '$lib/utils/stores';
    import type { Potty, Suggestion, UserLocation } from '$lib/types';

    let potty: Potty = {
        name: '',
        address: '',
        latitude: 0,
        longitude: 0,
        notes: ''
    };

    let suggestions: Suggestion[] = [];
    let userLocation: UserLocation = { latitude: 0, longitude: 0 };
    const dispatch = createEventDispatcher();

    async function handleInput(event: InputEvent) {
        const target = event.target as HTMLInputElement;
        const value = target.value;

        if (value.length > 2) {
            suggestions = await fetchSuggestions(value, userLocation);
        }
    }

    async function handleSubmit() {
        await submitPotty(potty);
        const newPotties = await getPotties();
        potties.set(newPotties);
        dispatch('submitted', { success: true });
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" placeholder="Name" bind:value={potty.name} required />
    <input type="text" placeholder="Address" on:input={handleInput} bind:value={potty.address} required />
    <textarea placeholder="Notes" bind:value={potty.notes}></textarea>
    <button type="submit">Submit</button>

    <ul>
        {#each suggestions as suggestion}
            <li>{suggestion.properties.formatted}</li>
        {/each}
    </ul>
</form>

<style>
    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        cursor: pointer;
    }
</style>
