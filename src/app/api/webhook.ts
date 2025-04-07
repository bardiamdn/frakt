import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabaseAdmin } from '@/utils/supabaseAdmin';

export const config = {
  api: {
    bodyParser: false,
  },
};

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
  throw new Error('Stripe environment variables are missing.');
}

const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil',
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!STRIPE_SECRET_KEY || !STRIPE_WEBHOOK_SECRET) {
    throw new Error('Stripe environment variables are missing.');
  }

  if (req.method !== 'POST') return res.status(405).end();

  const sig = req.headers['stripe-signature'] as string | undefined;

  if (!sig) {
    return res.status(400).send('Missing Stripe signature');
  }

  const buf = await buffer(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      buf.toString(),
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error('Webhook error:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    } else {
      console.error('Unknown webhook error:', err);
      return res.status(400).send('Webhook Error: Unknown error');
    }
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;

    const { error } = await supabaseAdmin.from('invoices').insert([
      {
        user_id: userId,
        amount: (session.amount_total ?? 0) / 100,
        status: 'paid',
      },
    ]);

    if (error) console.error('Supabase error:', error.message);
  }

  res.status(200).json({ received: true });
}
