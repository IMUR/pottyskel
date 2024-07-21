import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default {
  preprocess: [vitePreprocess(), preprocess()],
  kit: {
    adapter: adapter({ out: "build" }), // Specify the output directory for the build
    alias: {
      $lib: "src/lib",
      $components: "src/lib/components",
      $utils: "src/lib/utils",
    },
  },
  vite: {
    ssr: {
      noExternal: ["@skeletonlabs/skeleton"],
    },
  },
};
