<script lang="ts">
    import { onMount } from 'svelte';
    import { get } from 'svelte/store';
    import { suggestions, submitPotty } from '$lib/utils/api';
    import type { Suggestion } from '$lib/types';

    let pottyName: string = '';
    let pottyAddress: string = '';
    let pottyRule: string = '';
    let pottyNotes: string = '';
    let pottyType: string = '';
    let addressSuggestions: Suggestion[] = [];

    async function handleAddressInput(event: Event) {
        const input = (event.target as HTMLInputElement).value;
        addressSuggestions = await suggestions(input);
    }

    async function handleSubmit(event: Event) {
        event.preventDefault();
        await submitPotty({ pottyName, pottyAddress, pottyRule, pottyNotes, pottyType });
    }

    function handleSuggestionClick(suggestion: Suggestion) {
        pottyAddress = suggestion.properties.formatted;
        addressSuggestions = [];
    }
</script>

<form on:submit={handleSubmit}>
    <input type="text" bind:value={pottyName} placeholder="Potty Name" required />
    <input type="text" bind:value={pottyAddress} on:input={handleAddressInput} placeholder="Potty Address" required />
    <ul>
        {#each addressSuggestions as suggestion}
            <li role="option" aria-selected="false" tabindex="0" on:click={() => handleSuggestionClick(suggestion)} on:keydown={(event) => event.key === 'Enter' && handleSuggestionClick(suggestion)}>{suggestion.properties.formatted}</li>
        {/each}
    </ul>
    <select bind:value={pottyRule} required>
        <option value="" disabled selected>Potty Rule</option>
        <option>Door Code</option>
        <option>Free Access</option>
        <option>Ask Staff</option>
        <option>Call or Text</option>
        <option>Self Explanatory</option>
        <option>Physical Key</option>
    </select>
    <textarea bind:value={pottyNotes} placeholder="Potty Notes" required></textarea>
    <select bind:value={pottyType}>
        <option value="" disabled selected>Potty Type</option>
        <option>General</option>
        <option>Supermarket</option>
        <option>Hospital</option>
        <option>Restaurant</option>
        <option>Retail Store</option>
        <option>Gas Station</option>
        <option>Movie Theater</option>
        <option>Coffee Shop</option>
        <option>Public Restroom</option>
        <option>Open Season</option>
        <option>Mall</option>
        <option>Hardware Store</option>
        <option>Pharmacy</option>
        <option>Parking Structure</option>
        <option>Hotel</option>
    </select>
    <button type="submit">Submit</button>
</form>
