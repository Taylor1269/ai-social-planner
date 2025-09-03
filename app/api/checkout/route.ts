import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const PRICE_IDS: Record<string, string> = {
  early: process.env.PRICE_EARLY_GBP!,
  standard: process.env.PRICE_STANDARD_GBP!,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const plan = (req.query.plan as string) ?? "standard";
    const price = PRICE_IDS[plan];
    const appUrlRaw = process.env.NEXT_PUBLIC_APP_URL;
    const appUrl = appUrlRaw ? appUrlRaw.replace(/\/+$/, "") : undefined;

    if (!price) return res.status(400).json({ error: `Bad plan: ${plan}` });
    if (!appUrl) return res.status(500).json({ error: "Missing NEXT_PUBLIC_APP_URL" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price, quantity: 1 }],
      success_url: `${appUrl}/app?cs={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/pricing`,
      allow_promotion_codes: true,
    });

    // 303 redirect to Stripe
    res.setHeader("Location", session.url!);
    return res.status(303).end();
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? "Internal error" });
  }
}