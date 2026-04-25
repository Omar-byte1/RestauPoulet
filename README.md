# TestProject (React + TS)

## Run

```bash
npm install
npm run dev
```

## Architecture

- `src/app/`: app composition (router, shells/layout, providers)
- `src/pages/`: route-level screens (one folder per page)
- `src/components/`: reusable components
  - `src/components/ui/`: low-level UI primitives (Button, Input, etc.)
  - `src/components/layout/`: shared layout pieces (Navbar, Footer, etc.)
- `src/hooks/`: reusable React hooks
- `src/lib/`: utilities and framework-agnostic helpers
- `src/styles/`: global styles

## Routing

Routes are defined in `src/app/router.tsx` using `react-router-dom`.

