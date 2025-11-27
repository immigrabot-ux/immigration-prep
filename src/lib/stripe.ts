import Stripe from 'stripe';

let stripeInstance: Stripe | null = null;

export function getStripe(): Stripe {
  if (!stripeInstance) {
    const secretKey = process.env.STRIPE_SECRET_KEY;

    if (!secretKey) {
      console.error('❌ STRIPE_SECRET_KEY environment variable is not set');
      throw new Error('Missing STRIPE_SECRET_KEY environment variable. Please set it in your environment.');
    }

    console.log('🔧 Initializing Stripe with key:', secretKey.substring(0, 10) + '...');

    try {
      stripeInstance = new Stripe(secretKey, {
        apiVersion: '2025-11-17.clover',
        typescript: true,
      });
      console.log('✅ Stripe initialized successfully');
    } catch (error) {
      console.error('💥 Failed to initialize Stripe:', error);
      throw error;
    }
  }

  return stripeInstance;
}

// Lazy getter for backward compatibility
// This will only initialize Stripe when first accessed
let _stripeCache: Stripe | null = null;
export const stripe = new Proxy({} as Stripe, {
  get: (target, prop) => {
    if (!_stripeCache) {
      _stripeCache = getStripe();
    }
    return _stripeCache[prop as keyof Stripe];
  }
});
