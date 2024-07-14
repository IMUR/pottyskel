<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    
    const dispatch = createEventDispatcher();
    let pottyName = '';
    let pottyAddress = '';
    let pottyRule = '';
    let pottyNotes = '';
    let pottyType = '';
    let latitude = 0;
    let longitude = 0;

    const rules = ['Door Code', 'Free Access', 'Ask Staff', 'Call or Text', 'Self Explanatory', 'Physical Key'];
    const types = ['General', 'Supermarket', 'Hospital', 'Restaurant', 'Retail Store', 'Gas Station', 'Movie Theater', 'Coffee Shop', 'Public Restroom', 'Open Season', 'Mall', 'Hardware Store', 'Pharmacy', 'Parking Structure', 'Hotel'];

    onMount(() => {
        // Initialize Geoapify Autocomplete here
    });

    const handleSubmit = async () => {
        const geocodedAddress = await geocodeAddress(pottyAddress); // Use Geoapify API to geocode
        latitude = geocodedAddress.lat;
        longitude = geocodedAddress.lon;

        const newPotty = {
            pottyName,
            pottyAddress,
            pottyRule,
            pottyNotes,
            pottyType,
            latitude,
            longitude
        };

        const response = await fetch('/api/potties', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPotty)
        });

        const result = await response.json();
        dispatch('submit', result);
    };

    async function geocodeAddress(address: string) {
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=52e42fd1727343ddb979120e8c9d473c`);
        const data = await response.json();
        return data.features[0].geometry;
    }
</script>

<form on:submit|preventDefault={handleSubmit}>
    <input type="text" bind:value={pottyName} placeholder="Potty Name" required />
    <input type="text" bind:value={pottyAddress} placeholder="Potty Address" required />
    <select bind:value={pottyRule} required>
        {#each rules as rule}
            <option value={rule}>{rule}</option>
        {/each}
    </select>
    <textarea bind:value={pottyNotes} placeholder="Potty Notes" required></textarea>
    <select bind:value={pottyType}>
        <option value="">Select Type (Optional)</option>
        {#each types as type}
            <option value={type}>{type}</option>
        {/each}
    </select>
    <button type="submit">Submit</button>
</form>
