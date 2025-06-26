import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardHeader from "../../app/dashboard/sections/DashboardHeader";
import {redirect} from "next/navigation";
import {prisma} from "../../app/lib/prisma";
import {stripe} from "../../app/lib/stripe";
import {unstable_noStore as noStore} from "next/cache";


async function getData({
    email,
    id,
    firstName,
    lastName,
    profileImage
                       } : {
    email: string;
    id: string;
    firstName: string | undefined | null;
    lastName: string | undefined | null;
    profileImage: string | undefined | null;
}) {

    console.log("🔍 getData called with:", { email, id, firstName, lastName });


    noStore();
   let user = await prisma.user.findUnique({
     where: {
         id: id
     },
       select: {
         id: true,
         stripeCustomerId: true,
       },
   });

    console.log("📦 User from DB before create:", user);

   if(!user) {
       const name = `${firstName ?? ''} ${lastName ?? ''}`
       await prisma.user.create({
          data: {
              id: id,
              email: email,
              name: name,
          },

       });

       console.log("✅ User created in DB");

       // const newUser = await prisma.user.findUnique({
       //     where: {
       //         id: id
       //     },
       // });
       //
       // if (!newUser.stripeCustomerId) {
       //     const data = await stripe.customers.create({
       //         email: email,
       //     });
       //
       //     await prisma.user.update({
       //         where: {
       //             id: id
       //         },
       //         data: {
       //             stripeCustomerId: data.id,
       //         },
       //     });
       //
       //     console.log("✅ Stripe customer created and saved:", data.id);
       // }

       user = await prisma.user.findUnique({
           where: {
               id
           },
       });


       if (!user?.stripeCustomerId) {
           console.log("💳 Creating Stripe customer for:", email)
           const data = await stripe.customers.create({
               email: email,
           });

           await prisma.user.update({
               where: {
                   id: id,
               },
               data: {
                   stripeCustomerId: data.id,
               },
           });

           console.log("✅ Stripe customer created and saved:", data.id)
       } else {
           console.log("ℹ️ User already has Stripe customer ID:", user.stripeCustomerId);
       }

   }

   const data = await stripe.customers.create({
       email,
       name: "Loreta Test",
       description: "Create from dev app",
   });
    console.log("🎯 Stripe full customer object:", data);
}


export const DashboardHeaderServer = async () => {

    const {isAuthenticated, getUser} = getKindeServerSession();

    const authenticated = await isAuthenticated();

    const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }



  await getData({
       email: user.email as string,
       firstName: user.given_name as string,
       id: user.id as string,
       lastName: user.family_name as string,
       profileImage: user.picture
   });

    return (

        <DashboardHeader isAuthenticated={authenticated} user={user}/>
    )


}
export default DashboardHeaderServer;