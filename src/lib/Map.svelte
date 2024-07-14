<script lang="ts">
    import { onMount } from 'svelte';
    import maplibregl from 'maplibre-gl';
    import 'maplibre-gl/dist/maplibre-gl.css';
    import { writable } from 'svelte/store';

    const map = writable(null);

    onMount(async () => {
        const userLocation = await getUserLocation();
        const mapInstance = new maplibregl.Map({
            container: 'map',
            style: `https://maps.geoapify.com/v1/styles/osm-carto/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c`,
            center: [userLocation.longitude, userLocation.latitude],
            zoom: 13
        });

        mapInstance.on('load', () => {
            fetchMarkers(mapInstance);
        });

        map.set(mapInstance);
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

    async function fetchMarkers(mapInstance) {
        const response = await fetch('/api/potties');
        const potties = await response.json();
        
        potties.forEach(potty => {
            new maplibregl.Marker()
                .setLngLat([potty.longitude, potty.latitude])
                .setPopup(new maplibregl.Popup().setHTML(`<h3>${potty.pottyName}</h3><p>${potty.pottyAddress}</p><p>${potty.pottyRule}</p><p>${potty.pottyNotes}</p>`))
                .addTo(mapInstance);
        });
    }
</script>

<div id="map" class="h-full w-full"></div>
<style>
    #map {
        height: 100vh;
        width: 100%;
    }
</style>
