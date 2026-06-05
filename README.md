# FindMySubsidy 🇮🇳

FindMySubsidy is a premium, interactive, map-first platform that helps users discover government subsidies, schemes, grants, incentives, and support programs available in different Indian states.

Designed for founders, MSMEs, manufacturers, and industry teams, it offers a visual and modern approach to navigating government policies—replacing static PDFs and outdated portals with a fluid, responsive discovery workspace.

---

## 🌟 Core Features

- **Interactive India Map**: Explore India's states visually. Zoom and pan on smaller states, hover to view active scheme counts instantly via mouse-tracking tooltips, and select any state to highlight it.
- **Unified Workspace Layout**: The landing page presents the map and state information side-by-side above the fold, ensuring the visual "Click State → Discover Subsidies" flow is immediately clear.
- **Dynamic State Schemes List**: Get a listing of all active incentives, categorized by sector, with inline search capabilities to filter schemes by name, department, or keyword.
- **Timeline Steppers for Applications**: Learn how to apply through custom-designed step timelines that outline registration, verification, and disbursement stages.
- **Detailed visual panels**: View Key Benefits, Eligibility Criteria, and Required Documents organized in neat, color-themed cards with official portal direct links.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/latest/docs/start/overview) (React 19 + TanStack Router) for fast Server-Side Rendering (SSR) and routing.
- **Styling**: Tailwind CSS & Lightning CSS for optimized design performance.
- **Map Engine**: `react-simple-maps` with TopoJSON files for scaling and rendering.
- **Animations**: `framer-motion` for spring-based drawer slide-overs and smooth list entry animations.
- **Icons**: `lucide-react` for standard SaaS icons.
- **Build & Server**: Vite + Nitro Engine for universal code bundling and serverless deployments.

---

## 🚀 Quick Start

### 1. Prerequisites
Ensure you have Node.js and `npm` installed.

### 2. Install Dependencies
Due to React 19 peer dependency constraints in the map rendering libraries, use the `--legacy-peer-deps` flag:
```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
Start the local server at `http://localhost:8080/`:
```bash
npm run dev
```

### 4. Build and Verification
Compile both client static assets and server SSR outputs:
```bash
npm run build
```

---

## ☁️ Deployment (Vercel)

The project is pre-configured to build serverless endpoints for Vercel using the Nitro bundler preset.

1. Install the Vercel CLI or run via `npx`:
   ```bash
   npx vercel login
   ```
2. Deploy the pre-built outputs directly:
   ```bash
   npx vercel --prod --yes
   ```
This automatically reads the `nitro: { preset: 'vercel' }` configuration in `vite.config.ts` and deploys the SSR serverless handlers.
