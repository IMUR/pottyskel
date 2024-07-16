<!-- src/routes/+page.svelte -->
<script context="module" lang="ts">
    export async function load({ fetch }) {
        const response = await fetch('/api');
        const potties = await response.json();
        return { props: { potties } };
    }
</script>

<script lang="ts">
    import Form from '$lib/components/Form.svelte';
    import List from '$lib/components/List.svelte';
    import Map from '$lib/components/Map.svelte';
    import { potties } from '$lib/utils/stores';

    export let potties: any;

    potties.set(potties);
</script>

<main>
    <h1>Potty Skel</h1>
    <Form on:submitted={() => console.log('Form submitted')} />
    <List />
    <Map />
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2rem;
    }
</style>
