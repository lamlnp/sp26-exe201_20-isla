# Frontend Structure

This frontend keeps the current Next.js App Router layout at the project root.

```text
app/                 Next.js routes, layouts, route groups, and API handlers
assets/              Local non-public source assets
components/          Shared UI and legacy/prototype IslaMind components
config/              App-level configuration
constants/           Shared constants and static options
features/            Domain modules grouped by product area
hooks/               Shared React hooks
lib/                 Shared utilities and existing mock data/types
public/              Static files served from the web root
services/            API clients, browser storage, and integration helpers
stores/              Client-side state stores
styles/              Shared style modules beyond app/globals.css
tests/               Unit and end-to-end tests
types/               Cross-feature TypeScript types
```

Feature folders should own their local components, hooks, services, and types.
Shared code should move up only when more than one feature needs it.
