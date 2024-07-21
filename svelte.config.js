import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import preprocess from "svelte-preprocess";

export default {
  preprocess: [vitePreprocess(), preprocess()],
  kit: {
    adapter: adapter(),
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
