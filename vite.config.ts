import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import sveltePreprocess from "svelte-preprocess";

export default defineConfig({
  plugins: [sveltekit()],
  ssr: {
    noExternal: ["@skeletonlabs/skeleton"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString();
          }
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Adjust this limit as needed
  },
});
