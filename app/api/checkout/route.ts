/ app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20",
});

function getPriceId(plan: "early" | "standard") {
  return plan === "early" ? process.env.PRICE_EARLY_GBP : process.env.PRICE_STANDARD_GBP;
}

async function createSession(plan: "early" | "standard") {
  const base = process.env.NEXT_PUBLIC_APP_URL;
  if (!base) throw new Error("NEXT_PUBLIC_APP_URL missing");

  const priceId = getPriceId(plan);
  if (!priceId) throw new Error(`Price ID not configured for plan: ${plan}`);

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${base}/pricing?success=1`,
    cancel_url: `${base}/pricing?canceled=1`,
    // 7-day trial for Standard
    subscription_data: plan === "standard" ? { trial_period_days: 7 } : undefined,
    allow_promotion_codes: true,
  });

  return session.url!;
}

// GET /api/checkout?plan=early|standard  → redirects to Stripe Checkout
export async function GET(req: NextRequest) {
  try {
    const planParam = (req.nextUrl.searchParams.get("plan") || "").toLowerCase();
    const plan = (planParam === "standard" ? "standard" : "early") as "early" | "standard";
    const url = await createSession(plan);
    return NextResponse.redirect(url, { status: 303 });
  } catch (err) {
    console.error("Checkout GET error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}

// POST still supported if you prefer fetch from client
export async function POST(req: Request) {
  try {
    const { plan } = (await req.json()) as { plan?: "early" | "standard" };
    if (!plan) return NextResponse.json({ error: "Missing plan" }, { status: 400 });
    const url = await createSession(plan);
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Checkout POST error:", err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}