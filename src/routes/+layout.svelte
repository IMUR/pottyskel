<script context="module" lang="ts">
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
      .then(() => {
        console.log('Service worker registered.');
      })
      .catch((error) => {
        console.error('Service worker registration failed:', error);
      });
  }
</script>

<slot />
