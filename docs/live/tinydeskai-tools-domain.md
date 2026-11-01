# Production domain: tinydeskai.tools

The Worker is attached with a route on the existing proxied DNS for `tinydeskai.tools`. A Workers custom domain was not used, because the apex already has DNS records and this login cannot replace them.

Production origin: `https://tinydeskai.tools`. Local `APP_URL` stays `http://localhost:5020`.

Set together for this deploy:

- `sites/tinydeskai-example/site.config.ts` `url`
- `sites/tinydeskai-example/wrangler.jsonc` `routes`, `APP_URL`, and `EMAIL_FROM` (`noreply@tinydeskai.tools`)
- `sites/tinydeskai-example/src/site/legal.tsx` `SUPPORT_EMAIL` (`support@tinydeskai.tools`)

Google, Stripe, and real generation are not configured. Checkout and generation stay closed, and `UPSTREAM_MOCK` is not set on the Worker. The compose container is not deployed: it needs the Workers Paid plan ($5 USD per month minimum, plus container usage) and Docker on the deploy machine. Enable that plan manually before adding the container back.
