# learn-skia-canvaskit

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.2.3. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.

---

https://www.youtube.com/watch?v=FjUWI4SUiXQ
https://github.com/google/skia/blob/main/modules/canvaskit/CHANGELOG.md

I could use https://github.com/motiondivision/motion or popmotionjs or animejs v4
or https://github.com/skevy/wobble
also see https://github.com/aholachek/mobile-first-animation

see: https://developer.chrome.com/blog/scrolling-intervention

from https://github.com/ajitid/raylib-ctrlui/blob/main/package.json:

```
  "devDependencies": {
    "@tweakpane/core": "^2.0.4",
    "typescript": "^5.2.2",
    "vite": "^5.3.4"
  },
  "dependencies": {
    "@preact/signals": "^1.3.0",
    "htm": "^3.1.1",
    "ky": "^1.5.0",
    "preact": "^10.23.1",
    "tweakpane": "^4.0.4"
  }
```

Usually I type:

```
watchexec -qnrc --workdir $PWD  -- go run main.go
```

For Bun, I shouldn't have to do anything as it has a watch mode (I assume it is picking up from the code `development: true`). All I need to do is `bun server.ts`.
