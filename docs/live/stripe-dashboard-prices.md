# Stripe dashboard prices

`StripeProvider.createCheckout` sends `price: product.refs.stripe` when that id is set. Products without it still use inline `price_data`, so other sites are unchanged.

tinydeskai-example stores the three one-time Price ids on `video_1`, `video_3` and `video_10`. Checkout, portal, sync and the Stripe webhook stay closed unless the Worker var `PAYMENTS` is exactly `"1"` and both Stripe secrets are set. Do not set `PAYMENTS` until a full generation has been verified.
