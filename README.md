# mythic-phone UI

Redesigned by Steve - @trapicole

FiveM / Mythic Framework phone UI — refactored to **React 18 + TypeScript + Vite**.

---

## Stack

| Before | After |
|---|---|
| React 17 (JS) | React 18 (TypeScript) |
| Webpack 5 + Babel | Vite 4 |
| `react-router-dom` v5 | `react-router-dom` v6 |
| `redux` + manual store | `@reduxjs/toolkit` `configureStore` |
| `prop-types` | TypeScript interfaces |
| `ifdef-loader` DEBUG | `import.meta.env.DEV` |
| `react-loadable` | `React.lazy` + `Suspense` |
| `@material-ui/*` (MUI v4/v5 beta) | `@mui/material` v5 stable |

---

## Getting started

```bash
# Install dependencies
bun install

# Start dev server (hot reload, no FiveM needed)
bun run dev

# Production build → outputs to dist/
bun run build
```

The `dist/` folder is what FiveM/Mythic reads. The resource `fxmanifest.lua` should point to `web/dist/index.html`.

---

## Key files

| File | Purpose |
|---|---|
| `vite.config.ts` | Vite config; path aliases mirror old webpack `resolve.modules` |
| `tsconfig.json` | TypeScript config; `strict: false` to ease migration |
| `src/main.tsx` | App entry point (replaces `src/app.js`) |
| `src/store.ts` | Redux store + typed `useAppDispatch` / `useAppSelector` |
| `src/reducers.ts` | Combined root reducer |
| `src/util/Nui.ts` | FiveM NUI fetch helper — no-ops in dev, live in prod |
| `src/hooks/typed.ts` | Re-exports typed dispatch/selector hooks |

---

## Gradual migration

All existing `.jsx` / `.js` files **continue to work** — Vite handles them via the `allowJs: true` tsconfig flag.  
Migrate files to `.tsx` / `.ts` incrementally:

1. Rename the file (e.g. `index.jsx` → `index.tsx`).
2. Fix any TypeScript errors reported by `npm run typecheck`.
3. Replace raw `useSelector` / `useDispatch` with the typed versions from `hooks/typed.ts`.

---

## NUI communication

```ts
import Nui from 'util/Nui';

// Send event to Lua
await Nui.send('myEvent', { someKey: 'someValue' });

// Dev-only: fake an incoming server message
Nui.emulate('SET_DATA', { type: 'contacts', data: [] });
```

---

## Removed dependencies

The following packages were removed as unused or superseded:

- `webpack`, `webpack-cli`, `webpack-dev-server` — replaced by Vite
- `babel-loader`, `@babel/core`, `@babel/preset-*`, `@babel/polyfill` — not needed with Vite/esbuild
- `ifdef-loader` — replaced by `import.meta.env.DEV`
- `react-loadable` — replaced by `React.lazy`
- `uglifyjs-webpack-plugin`, `terser-webpack-plugin` — Vite handles minification
- `css-loader`, `style-loader`, `file-loader`, `url-loader`, `html-loader`, `svg-url-loader` — Vite handles all asset types natively
- `dotenv-webpack` — use `.env` files; Vite supports them out of the box
- `prop-types` — replaced by TypeScript
- `axios` — not imported anywhere in source; use native `fetch` (already used in Nui.ts)
- `react-typist`, `react-scaling`, `react-use-stopwatch`, `react-countdown-hook` — not found in source
- `react-process-string`, `react-element-to-jsx-string`, `react-jsx-parser` — not found in active source
- `react-copy-to-clipboard`, `react-horizontal-scrolling-menu`, `react-input-mask` — not found in active source
- `random-material-color`, `material-ui-nested-menu-item` — not found in active source
- `parse-ms`, `react-moment`, `react-truncate` — not found in active source
- `@material-ui/*` (beta packages) — replaced by `@mui/material` v5 stable
- `thunk` (bare package) — `redux-thunk` is already included
