import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";
import { resolve } from "path";

export default {
  preprocess: [vitePreprocess(), preprocess()],
  kit: {
    adapter: adapter({ out: "build" }), // Specify the output directory for the build
    alias: {
      $lib: resolve("./src/lib"),
      $components: resolve("./src/lib/components"),
      $utils: resolve("./src/lib/utils"),
    },
    vite: {
      resolve: {
        alias: {
          $lib: resolve("./src/lib"),
          $components: resolve("./src/lib/components"),
          $utils: resolve("./src/lib/utils"),
        },
      },
    },
  },
};
