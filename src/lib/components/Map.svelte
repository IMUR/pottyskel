<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import type { Potty } from '$lib/types';

  let potties: Potty[] = [];
  let map: maplibregl.Map;
  let userLocation: { longitude: number; latitude: number } | null = null;

  const mapTilerApiKey = '52e42fd1727343ddb979120e8c9d473c';

  onMount(() => {
    initializeMap();
  });

  function initializeMap() {
    map = new maplibregl.Map({
      container: 'map',
      style: `https://api.maptiler.com/maps/streets/style.json?key=${mapTilerApiKey}`,
      center: [0, 0],
      zoom: 12
    });

    const navControl = new maplibregl.NavigationControl();
    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
      showUserLocation: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    map.on('load', () => {
      geolocateControl.trigger();
      addMarkers();
    });

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      userLocation = { longitude, latitude };
      map.setCenter([longitude, latitude]);
      sortPottiesByDistance();
    });
  }

  function addMarkers() {
    potties.forEach((potty) => {
      if (isValidCoordinate(potty)) {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.style.cursor = 'pointer';

        const marker = new maplibregl.Marker({ element: markerElement })
          .setLngLat([potty.longitude, potty.latitude])
          .addTo(map);

        marker.getElement().addEventListener('click', () => handleMarkerClick(potty));
      } else {
        console.error('Invalid coordinates for potty:', potty);
      }
    });
  }

  function isValidCoordinate(potty: Potty): boolean {
    return potty.latitude >= -90 && potty.latitude <= 90 &&
           potty.longitude >= -180 && potty.longitude <= 180;
  }

  function handleMarkerClick(potty: Potty) {
    console.log('Potty clicked:', potty);
    map.setCenter([potty.longitude, potty.latitude]);
    map.setZoom(15); // Adjust the zoom level as needed
    showInfoBubble(potty);
  }

  function showInfoBubble(potty: Potty) {
    const existingBubble = document.querySelector('.info-bubble');
    if (existingBubble) {
      existingBubble.remove();
    }

    const infoBubble = document.createElement('div');
    infoBubble.className = 'info-bubble';
    infoBubble.innerHTML = `
      <h3>${potty.pottyName}</h3>
      <p>${potty.pottyAddress}</p>
      <p>${potty.pottyRule}</p>
      <p>${potty.pottyNotes}</p>
    `;
    document.body.appendChild(infoBubble);
    const bubbleCoords = map.project([potty.longitude, potty.latitude]);
    infoBubble.style.left = `${bubbleCoords.x}px`;
    infoBubble.style.top = `${bubbleCoords.y}px`;
  }

  function sortPottiesByDistance() {
    if (userLocation) {
      potties = [...potties].sort((a, b) => {
        const distanceA = calculateDistance(userLocation!.latitude, userLocation!.longitude, a.latitude, a.longitude);
        const distanceB = calculateDistance(userLocation!.latitude, userLocation!.longitude, b.latitude, b.longitude);
        return distanceA - distanceB;
      });
    }
  }

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  }
</script>

<div id="map" class="map-container"></div>

<style>
  .map-container {
    height: 100%;
    width: 100%;
  }
</style>
