<script lang="ts">
    import { writable } from 'svelte/store';
    import { fetchSuggestions, fetchGeolocation, submitPotty } from '$lib/utils/api';
    import type { Suggestion, UserLocation } from '$lib/types';

    const pottyName = writable('');
    const pottyAddress = writable('');
    const pottyRule = writable('');
    const pottyNotes = writable('');
    const pottyType = writable('');
    const suggestions = writable<Suggestion[]>([]);
    let userLocation: UserLocation;

    fetchGeolocation().then(location => {
        userLocation = location;
    });

    const handleInput = async (event: Event) => {
        const target = event.target as HTMLInputElement;
        const value = target.value;
        suggestions.set(await fetchSuggestions(value, userLocation));
    };

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        const newPotty = {
            pottyName: $pottyName,
            pottyAddress: $pottyAddress,
            pottyRule: $pottyRule,
            pottyNotes: $pottyNotes,
            pottyType: $pottyType,
            latitude: userLocation.latitude,
            longitude: userLocation.longitude
        };
        await submitPotty(newPotty);
    };
</script>

<form on:submit={handleSubmit}>
    <input type="text" bind:value={$pottyName} placeholder="Potty Name" required />
    <input type="text" bind:value={$pottyAddress} placeholder="Potty Address" on:input={handleInput} required />
    <select bind:value={$pottyRule} required>
        <option value="Door Code">Door Code</option>
        <option value="Free Access">Free Access</option>
        <option value="Ask Staff">Ask Staff</option>
        <option value="Call or Text">Call or Text</option>
        <option value="Self Explanatory">Self Explanatory</option>
        <option value="Physical Key">Physical Key</option>
    </select>
    <input type="text" bind:value={$pottyNotes} placeholder="Potty Notes" required />
    <select bind:value={$pottyType}>
        <option value="General">General</option>
        <option value="Supermarket">Supermarket</option>
        <option value="Hospital">Hospital</option>
        <option value="Restaurant">Restaurant</option>
        <option value="Retail Store">Retail Store</option>
        <option value="Gas Station">Gas Station</option>
        <option value="Movie Theater">Movie Theater</option>
        <option value="Coffee Shop">Coffee Shop</option>
        <option value="Public Restroom">Public Restroom</option>
        <option value="Open Season">Open Season</option>
        <option value="Mall">Mall</option>
        <option value="Hardware Store">Hardware Store</option>
        <option value="Pharmacy">Pharmacy</option>
        <option value="Parking Structure">Parking Structure</option>
        <option value="Hotel">Hotel</option>
    </select>
    <button type="submit">Submit</button>
</form>
