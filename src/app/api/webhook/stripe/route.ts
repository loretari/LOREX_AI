import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "../../../lib/stripe";
import { prisma } from "../../../lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: Request) {
  console.log("🔵 Stripe webhook endpoint hit");

  const body = await req.text();

  const headersList = await headers();
  const signature = headersList.get('Stripe-Signature') as string;
  console.log("💥 Webhook received!");
  let event: Stripe.Event;

  try {
      event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    )

  } catch (error: unknown) {
    console.error("❌ Error verifying webhook:", error)
    return new Response("Webhook error", {status: 400});
  }
  console.log("⚡️ Event type:", event.type);

  //
  // let user = null;
  // let session: any = null;

  if(event.type === 'checkout.session.completed') {

     const session = event.data.object as Stripe.Checkout.Session;
    console.log('✅ Checkout session completed:', session);

    console.log(`Payment was successful for user`)

    const customerId = session.customer as string;

    const user = await prisma.user.findUnique({
      where: {
        stripeCustomerId: customerId
      },
    });

    if (!user) {
      console.log("User not found for customerId:", customerId);
      throw new Error('User not found...');
    }

    const paymentIntentId = session.payment_intent as string;

    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    console.log("💳 Retrieved PaymentIntent:", paymentIntent);



    // let paymentIntent: Stripe.PaymentIntent | null = null;
    //
    // if (session.payment_intent) {
    //    paymentIntent = await stripe.paymentIntents.retrieve(
    //     session.payment_intent as string
    //   );
    //   console.log("💳 PaymentIntent info:", paymentIntent)
    // } else {
    //   console.warn("⚠️ payment_intent is null.");
    // }

    // const lineItems = await stripe.checkout.sessions.listLineItems(
    //   session.id, {
    //     limit: 1,
    //   }
    // );

    // const item = lineItems.data[0];
    //
    // if (session.customer) {
    //   const customer = await stripe.customers.retrieve(
    //     session.customer as string
    //   );
    //   console.log("👤 Customer info:", customer)
    // }

    // const customerId = String(session.customer);

    // if (paymentIntent) {
      await prisma.payment.create({
        data: {
          stripePaymentId: paymentIntent.id,
          userId: user.id,
          amount: paymentIntent.amount,
          status: paymentIntent.status,
          currency: paymentIntent.currency
          ,
          // planId: item.price?.id,
          // interval: item.price?.recurring?.interval || null,
          // currentPeriodStart: null,
          // currentPeriodEnd: null,
        },
      });
      console.log("💾 Payment recorded in DB");
    // } else {
    //   console.warn("⚠️ paymentIntent is still null after attempting to retrieve it.");
    }






  // }

  // if(event.type === 'invoice.payment_success') {
  //   const subscription = await stripe.subscriptions.retrieve(
  //     session.subscription as string
  //   );
  //
  //   await prisma.subscription.update({
  //     where: {
  //       stripeSubscriptionId: subscription.id
  //     },
  //     data: {
  //       planId: subscription.items.data[0].price.id,
  //       currentPeriodStart: subscription.current_period_start,
  //       currentPeriodEnd: subscription.current_period_end,
  //       status: subscription.status,
  //     },
  //
  //   });
  //
  // }

  // } else if (event.type === 'invoice.payment_succeeded') {
  //    session = event.data.object;
  //
  //   const customerId = session.customer as string;
  //
  //    user = await prisma.user.findUnique({
  //     where: {
  //       stripeCustomerId: customerId,
  //     }
  //   });
  //
  //   if (!user) {
  //     console.log("❌ User not found for invoice event");
  //     throw new Response("Vartotojas nerastas pagal nurodytus duomenis", { status: 404 });
  //   }
  //
  //   await prisma.payment.create ({
  //     data: {
  //       userId: user.id,
  //       status: 'active',
  //       amount: session.amount_paid,
  //       currency: session.currency,
  //     }
  //   });
  //   console.log('✅ Mokėjimas įrašytas kaip aktyvus')
  // }

  // if (user && session) {
  //   const existing = await prisma.payment.findFirst({
  //     where: {
  //       userId: user.id,
  //       amount: session.amount_paid,
  //       currency: session.currency,
  //       createdAt: {
  //         gte: new Date(Date.now() - 1000 * 60 * 2),
  //       },
  //     },
  //   });
  //
  //   if (!existing) {
  //     await prisma.payment.create({
  //       data: {
  //         userId: user.id,
  //         status: 'active',
  //         amount: session.amount_paid,
  //         currency: session.currency,
  //       },
  //     });
  //     console.log("🆕 Dubliuotas mokėjimas įrašytas iš fallback");
  //   }
  // }



  return new Response(null, { status: 200 });

}