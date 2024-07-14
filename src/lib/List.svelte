<script lang="ts">
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    const potties = writable([]);

    onMount(async () => {
        const response = await fetch('/api/potties');
        const data = await response.json();
        potties.set(data);
    });

    let userLocation = { latitude: 0, longitude: 0 };
    
    onMount(async () => {
        userLocation = await getUserLocation();
        sortPottiesByDistance();
    });

    async function getUserLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            }, reject);
        });
    }

    function sortPottiesByDistance() {
        potties.update(list => {
            return list.sort((a, b) => {
                const distanceA = getDistance(userLocation, a);
                const distanceB = getDistance(userLocation, b);
                return distanceA - distanceB;
            });
        });
    }

    function getDistance(loc1, loc2) {
        const R = 6371e3; // metres
        const φ1 = loc1.latitude * Math.PI/180;
        const φ2 = loc2.latitude * Math.PI/180;
        const Δφ = (loc2.latitude - loc1.latitude) * Math.PI/180;
        const Δλ = (loc2.longitude - loc1.longitude) * Math.PI/180;

        const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                  Math.cos(φ1) * Math.cos(φ2) *
                  Math.sin(Δλ/2) * Math.sin(Δλ/2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }
</script>

{#each $potties as potty}
    <div>
        <h3>{potty.pottyName}</h3>
        <p>{potty.pottyAddress}</p>
        <p>{potty.pottyRule}</p>
        <p>{potty.pottyNotes}</p>
        <p>{potty.pottyType}</p>
    </div>
{/each}
