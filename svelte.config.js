import adapter from "@sveltejs/adapter-node";
import preprocess from "svelte-preprocess";
import { resolve } from "path";

export default {
  preprocess: preprocess(), // Use svelte-preprocess
  kit: {
    adapter: adapter({ out: "build" }),
    alias: {
      $lib: resolve("src/lib"),
      $components: resolve("src/lib/components"),
      $utils: resolve("src/lib/utils"),
    },
  },
};
