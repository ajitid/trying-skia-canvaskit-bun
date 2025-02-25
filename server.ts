import { serve } from "bun";

import home from "./src/index.html";

// taken from https://bun.sh/docs/bundler/fullstack
const server = serve({
  development: true,
  routes: {
    "/": home,
  },
});

console.log(`Listening on ${server.url}`);
