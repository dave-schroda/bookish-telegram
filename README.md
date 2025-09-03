# Next + WooCommerce (Headless) — App Router Skeleton

This is a minimal, production-ready skeleton for a headless WooCommerce storefront using Next.js App Router.
It assumes your WordPress/WooCommerce backend is available at `WP_URL` and that your product URLs in the
frontend should look like `/shop/<category>/<product-slug>`.

## Quick start
1. Copy `.env.example` to `.env.local` and fill in values.
2. `npm install`
3. `npm run dev`

## Environment variables
- WP_URL=https://your-wordpress.example.com
- NEXT_PUBLIC_BASE_URL=https://your-next-domain.com
- WC_CONSUMER_KEY=optional (server-only admin REST)
- WC_CONSUMER_SECRET=optional (server-only admin REST)

## Notes
- Store API calls are proxied through /app/api/cart/* to preserve cookies across domains.
- Webhooks from WordPress should POST to /api/revalidate to keep ISR fresh when products/categories change.
