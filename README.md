# Prime AI App Builder — Version 2

Owner-first AI website/app builder foundation.

## Included

- Local owner authentication demo
- Persistent browser workspace using localStorage
- Master owner dashboard
- 8 AI agent teams with enable/disable controls
- Global agent kill switch
- Code editor + live browser sandbox preview
- Build/Test orchestration workflow
- Project management
- HTML export
- Deployment center
- PWA / Android architecture notes
- Production backend boundary
- Environment variable template
- Responsive mobile UI

## Run

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the Vite URL.

Production build:

```bash
npm run build
npm run preview
```

## Important

The login, project database and agent orchestration in this V2 starter are intentionally local/demo functionality. For a real public platform, connect:
1. Real authentication
2. PostgreSQL/Supabase
3. Server-side AI gateway
4. Sandboxed build workers
5. Deployment provider API
6. Quotas/rate limits
7. Audit logs
8. Secure secret management

Do not put provider API keys in `src/` or client-side JavaScript.

## Free-tier launch path

For the frontend, a static host such as Cloudflare Pages can serve the built `dist` output. A production AI/deployment backend may require a provider with a suitable free tier or paid usage.

Build command: `npm run build`
Output directory: `dist`
