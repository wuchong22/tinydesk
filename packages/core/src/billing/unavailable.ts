import type {
  CheckoutFact,
  CheckoutRequest,
  PaymentFact,
  PaymentProvider,
  SubscriptionFact,
  WebhookTrigger,
} from './provider';

// Used when a site has not configured its payment provider. Methods must never run:
// handlers return before calling them, and a throw here is a backstop so nothing is charged or granted.
export class UnavailableProvider implements PaymentProvider {
  readonly configured = false;

  constructor(readonly name: string) {}

  private fail(): never {
    throw new Error('payments are not configured');
  }

  createCustomer(): Promise<string> {
    return this.fail();
  }

  createCheckout(_request: CheckoutRequest): Promise<{ url: string; checkoutRef: string }> {
    return this.fail();
  }

  parseWebhook(): Promise<WebhookTrigger> {
    return this.fail();
  }

  fetchCheckout(): Promise<CheckoutFact> {
    return this.fail();
  }

  fetchPayment(): Promise<PaymentFact | null> {
    return this.fail();
  }

  fetchPaymentByCharge(): Promise<PaymentFact | null> {
    return this.fail();
  }

  fetchSubscription(): Promise<SubscriptionFact | null> {
    return this.fail();
  }

  portalUrl(): Promise<string> {
    return this.fail();
  }
}
