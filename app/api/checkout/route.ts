// app/api/checkout/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

type CheckoutBody = {
  plan: "early" | "standard";
};

export async function POST(req: Request) {
  try {
    const { plan } = (await req.json()) as CheckoutBody;

    if (!plan) {
      return NextResponse.json({ error: "Missing plan" }, { status: 400 });
    }

    const priceId =
      plan === "early"
        ? process.env.PRICE_EARLY_GBP
        : process.env.PRICE_STANDARD_GBP;

    if (!priceId) {
      return NextResponse.json({ error: "Price ID not configured" }, { status: 500 });
    }

    const base = process.env.NEXT_PUBLIC_APP_URL;
    if (!base) {
      return NextResponse.json({ error: "NEXT_PUBLIC_APP_URL missing" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${base}/pricing?success=1`,
      cancel_url: `${base}/pricing?canceled=1`,
      // 7-day trial for Standard plan
      subscription_data: plan === "standard" ? { trial_period_days: 7 } : undefined,
      allow_promotion_codes: true,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}