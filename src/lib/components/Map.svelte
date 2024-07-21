<script lang="ts">
  import { onMount } from 'svelte';
  import maplibregl from 'maplibre-gl';
  import type { Potty } from '$lib/types';

  export let potties: Potty[];

  let map: maplibregl.Map;

  onMount(() => {
    map = new maplibregl.Map({
      container: 'map',
      style: `https://maps.geoapify.com/v1/styles/positron/style.json?apiKey=52e42fd1727343ddb979120e8c9d473c`,
      center: [0, 0],
      zoom: 12
    });

    const navControl = new maplibregl.NavigationControl();
    const geolocateControl = new maplibregl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: false,
      showUserLocation: true
    });

    map.addControl(navControl, 'top-right');
    map.addControl(geolocateControl, 'top-right');

    map.on('load', () => {
      geolocateControl.trigger();
    });

    geolocateControl.on('geolocate', (e) => {
      const { longitude, latitude } = e.coords;
      map.setCenter([longitude, latitude]);
      new maplibregl.Marker({ color: 'blue' })
        .setLngLat([longitude, latitude])
        .addTo(map);
    });

    potties.forEach((potty) => {
      const marker = new maplibregl.Marker({ color: 'red' })
        .setLngLat([potty.longitude, potty.latitude])
        .addTo(map);
      marker.getElement().addEventListener('click', () => {
        new maplibregl.Popup()
          .setLngLat([potty.longitude, potty.latitude])
          .setHTML(`<strong>${potty.pottyName}</strong><br>${potty.pottyAddress}<br>${potty.pottyRule}<br>${potty.pottyNotes}`)
          .addTo(map);
      });
    });
  });
</script>

<div id="map" class="w-full h-full rounded-r-lg overflow-hidden"></div>