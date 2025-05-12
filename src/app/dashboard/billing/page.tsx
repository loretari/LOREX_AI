import {Card, CardContent} from "../../../components/ui/card";
import {CheckCircle2} from "lucide-react";
import {Button} from "../../../components/Buttons";
import {prisma} from "../../lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {getStripeSession} from "../../lib/stripe";
import {redirect} from "next/navigation";
import {StripePaymentCreationButton} from "../components/SubmitButtons";



const featureItems = [
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
    {name: "Lorem ipsum something"},
]
async function getData(userId: string) {

    const data = await prisma.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            name: true,
            email: true,
            colorScheme: true,
        },
    });

    return data;
}


// async function getData(userId: string) {
//
//     const data = await prisma.payment.findUnique({
//         where: {
//             userId: userId,
//         },
//         select: {
//             status: true,
//             userId: true,
//             currentPeriodStart: true,
//             currentPeriodEnd: true,
//             planId: true,
//             user: {
//                 select: {
//                     stripeCustomerId: true,
//                 },
//             },
//         },
//     });
//     console.log(data)
//     return data;
// }

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