<script lang="ts">
    import { writable } from 'svelte/store';
    import { fetchSuggestions, submitPotty } from '$lib/utils/api';
    import { potties } from '$lib/utils/stores';
    import type { Suggestion } from '$lib/types';

    let pottyName = '';
    let pottyAddress = '';
    let pottyRule = '';
    let pottyNotes = '';
    let pottyType = '';
    let suggestions = writable<Suggestion[]>([]);
    let latitude = 0; // Set initial latitude
    let longitude = 0; // Set initial longitude

    async function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        pottyAddress = target.value;

        if (pottyAddress.length > 2) {
            const fetchedSuggestions = await fetchSuggestions(pottyAddress, latitude, longitude);
            suggestions.set(fetchedSuggestions);
        } else {
            suggestions.set([]);
        }
    }

    function handleSelect(suggestion: Suggestion) {
        pottyAddress = suggestion.properties.formatted;
        suggestions.set([]);
    }

    async function handleSubmit(event: Event) {
        event.preventDefault();
        const newPotty = {
            pottyName,
            pottyAddress,
            pottyRule,
            pottyNotes,
            pottyType,
            latitude,
            longitude
        };
        const response = await submitPotty(newPotty);
        if (response.ok) {
            const result = await response.json();
            potties.update(current => [...current, result.potty]);
        } else {
            console.error('Failed to submit potty', response);
        }
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={pottyName} placeholder="Potty Name" required />
    <input type="text" bind:value={pottyAddress} on:input={handleInput} placeholder="Potty Address" required />

    {#if $suggestions.length > 0}
        <ul>
            {#each $suggestions as suggestion}
                <li>
                    <button type="button" on:click={() => handleSelect(suggestion)}>
                        {suggestion.properties.formatted}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}

    <input type="text" bind:value={pottyRule} placeholder="Potty Rule" />
    <textarea bind:value={pottyNotes} placeholder="Potty Notes"></textarea>
    <select bind:value={pottyType}>
        <option value="" disabled selected>Select Potty Type</option>
        <option value="public">Public</option>
        <option value="private">Private</option>
    </select>

    <button type="submit">Submit</button>
</form>
