import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import { resolve } from "path";

export default {
  preprocess: preprocess(),
  kit: {
    adapter: adapter({ out: "build" }), // Specify the output directory for the build
    alias: {
      $lib: resolve("./src/lib"),
      $components: resolve("./src/lib/components"),
      $utils: resolve("./src/lib/utils"),
    },
    vite: {
      ssr: {
        noExternal: ["@skeletonlabs/skeleton"],
      },
      build: {
        chunkSizeWarningLimit: 1000, // Adjust the limit as needed
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
      },
    },
  },
};
