// import {Card, CardContent} from "../../../components/ui/card";
// import {CheckCircle2} from "lucide-react";
// import {Button} from "../../../components/Buttons";
// import {prisma} from "../../lib/prisma";
// import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
// import {getStripeSession, stripe} from "../../lib/stripe";
// import {redirect} from "next/navigation";
// import {StripePaymentCreationButton} from "../components/SubmitButtons";
//
// const featureItems = [
//     {name: "Lorem ipsum something"},
//     {name: "Lorem ipsum something"},
//     {name: "Lorem ipsum something"},
//     {name: "Lorem ipsum something"},
//     {name: "Lorem ipsum something"},
// ]
// async function getData(userId: string) {
//
//     const data = await prisma.user.findUnique({
//         where: {
//             id: userId,
//         },
//         select: {
//             name: true,
//             email: true,
//             colorScheme: true,
//         },
//     });
//
//     return data;
// }
//
//
// // async function getData(userId: string) {
// //
// //     const data = await prisma.subscription.findUnique({
// //
// //         where: {
// //             userId: userId,
// //         },
// //         select: {
// //             status: true,
// //             user: {
// //                 select: {
// //                     stripeCustomerId: true,
// //                 },
// //             },
// //         },
// //     });
// //     console.log(data)
// //     return data;
// // }
//
// export default async function BillingPage() {
//     const {getUser} = getKindeServerSession();
//     const user = await getUser();
//
//     // console.log("User from Kinde:", user)
//
//     // if (!user?.id) {
//     //     throw new Error("User not found");
//     // }
//     const data = await getData(user?.id as string);
//     // const data = await getData(user.id);
// // console.log(data)
//     async function createSubscription() {
//         "use server";
//         const dbUser = await prisma.user.findUnique({
//             where: {
//                 id: user?.id,
//             },
//             select: {
//                 stripeCustomerId: true,
//             },
//         });
//
//         if(!dbUser.stripeCustomerId) {
//             throw new Error("Unable to get customer id");
//         }
//
//          const subscriptionUrl = await getStripeSession({
//             customerId: dbUser.stripeCustomerId,
//             domainUrl: "http://localhost:3000",
//             priceId: process.env.STRIPE_PRICE_ID as string,
//         });
//         console.log("Payment URL:", subscriptionUrl);
//         return redirect(subscriptionUrl);
//     }
//
//     return (
//       <div className= "max-w-md mx-auto space-y-4">
//           <Card className= "flex flex-col">
//               <CardContent className= "py-8">
//                   <div>
//                       <h3 className= "inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-primary/10 text-primary">
//                           Monthly
//                       </h3>
//                   </div>
//
//                   <div className= "mt-4 flex items-baseline text-6xl font-extrabold">
//                       $30 <span className= "ml-1 text-2xl text-muted-foreground">/month</span>
//                   </div>
//                   <p className= "mt-5 texr-lg text-muted-foreground">Write as many notes as you want for $30 a Month</p>
//               </CardContent>
//               <div className= "flex-col flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-1 sm:p-10 sm:pt-6">
//                   <ul className= "space-y-4">
//                       {featureItems.map((item, index) => (
//                         <li key={index} className= "flex items-center">
//                             <div className= "flex-shrink-0">
//                                 <CheckCircle2 className= "h-6 w-6 text-violet-400" />
//                             </div>
//                             <p className= "ml-3 text-base">{item.name}</p>
//                         </li>
//                       ))}
//                   </ul>
//
//                   <form className= "w-full" action={createSubscription}>
//                       <StripePaymentCreationButton/>
//                   </form>
//               </div>
//           </Card>
//       </div>
//     )
// }


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../../components/ui/card";
import {CheckCircle2} from "lucide-react";
import { StripePortal } from "../components/SubmitButtons";
import {prisma} from "../../lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { getStripeSession, stripe } from "../../lib/stripe";
import {redirect} from "next/navigation";
import {StripePaymentCreationButton} from "../components/SubmitButtons";



const featureItems = [
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
]
// async function getData(userId: string) {
//
//     const data = await prisma.user.findUnique({
//         where: {
//             id: userId,
//         },
//         select: {
//             name: true,
//             email: true,
//             colorScheme: true,
//         },
//     });
//
//     return data;
// }


async function getData(userId: string) {

    const data = await prisma.payment.findFirst({
        where: {
            userId: userId,
        },
        select: {
            status: true,
            userId: true,
            createdAt: true,
            amount: true,
            currency: true,
            user: {
                select: {
                    stripeCustomerId: true,
                },
            },
        },
    });
    console.log(data)
    return data;
}

export default async function BillingPage() {
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    // console.log("User from Kinde:", user)

    if (!user?.id) {
        throw new Error("User not found");
    }
    const data = await getData(user?.id as string);
    // const data = await getData(user.id);
// console.log(data)


    async function createPayment() {
        "use server";
        const dbUser = await prisma.user.findUnique({
            where: {
                id: user?.id,
            },
            select: {
                stripeCustomerId: true,
            },
        });

        if(!dbUser.stripeCustomerId) {
            throw new Error("Unable to get customer id");
        }

        const priceId = process.env.STRIPE_PRICE_ID as string;

        if (!priceId) {
            throw new Error("Missing STRIPE_PRICE_ID")

        }


            const paymentUrl = await getStripeSession({
                customerId: dbUser.stripeCustomerId,
                domainUrl: 'http://localhost:3000',
                priceId: priceId,
            });
            console.log("Payment URL:", paymentUrl);
            return redirect(paymentUrl);
    }
    console.log("Payment data:", data);

    async function createCustomerPortal() {
        "use server";
        const session = await stripe.billingPortal.sessions.create({
            customer: data?.user.stripeCustomerId as string,
            return_url: "http://localhost:3000/dashboard",

        });

        return redirect(session.url);
    }


  if (data?.status === 'succeeded') {
      return (
          <div className= "grid items-start gap-8">
              <div className= "flex items-center justify-between px-2">
                  <div className= "grid gap-1">
                      <h1 className="text-3xl md:text-4xl font-semibold">Mokėjimas sėkmingas!</h1>
                      <p className="text-lg text-muted-foreground">
                          Gavome tavo užsakymą. Tavo nuotraukos šiuo metu generuojamos — tai gali užtrukti iki dviejų dienų.
                          Apie paruoštas nuotraukas informuosime el. paštu arba galėsi jas rasti savo paskyroje.
                      </p>
                  </div>
              </div>


              <Card className= "w-full lg:w-2/3">
                  <CardHeader>
                      <CardTitle>Keisti savo užsakymą</CardTitle>
                      <CardDescription>
                          Spustelėkite žemiau esantį mygtuką, kad galėtumėte
                          pakeisti mokėjimo informaciją ir tuo pačiu peržiūrėti savo ataskaitą
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <form action={createCustomerPortal}>
                          <StripePortal />
                      </form>
                  </CardContent>
              </Card>

          </div>


        )

  }



    return (
        <div className= "max-w-md mx-auto space-y-4">
<Card className= "flex flex-col">
    <CardContent className= "py-8">
        <div>
           <h3 className= "inline-flex px-4 py-1 rounded-full text-sm font-semibold tracking-wide uppercase hover:bg-primary/10 text-primary">
               Monthly
           </h3>
        </div>

        <div className= "mt-4 flex items-baseline text-6xl font-extrabold">
$30 <span className= "ml-1 text-2xl text-muted-foreground">/month</span>
        </div>
<p className= "mt-5 texr-lg text-muted-foreground">Write as many notes as you want for $30 a Month</p>
    </CardContent>
    <div className= "flex-col flex flex-col justify-between px-6 pt-6 pb-8 bg-secondary rounded-lg m-1 space-y-1 sm:p-10 sm:pt-6">
<ul className= "space-y-4">
    {featureItems.map((item, index) => (
        <li key={index} className= "flex items-center">
<div className= "flex-shrink-0">
    <CheckCircle2 className= "h-6 w-6 text-violet-400" />
</div>
            <p className= "ml-3 text-base">{item.name}</p>
        </li>
    ))}
</ul>

        <form className= "w-full" action={createPayment}>
           <StripePaymentCreationButton/>
        </form>
    </div>
</Card>
        </div>
    )
}