import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import DashboardHeader from "../../app/dashboard/sections/DashboardHeader";
import {redirect} from "next/navigation";
import {prisma} from "../../app/lib/prisma";


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
   const user = await prisma.user.findUnique({
     where: {
         id: id
     },
       select: {
         id: true,
         stripeCustomerId: true,
       },
   });
   if(!user) {
       const name = `${firstName ?? ''} ${lastName ?? ''}`
       await prisma.user.create({
          data: {
              id: id,
              email: email,
              name: name,

          }
       })
   }
}


export const DashboardHeaderServer = async () => {
    const {isAuthenticated, getUser} = getKindeServerSession();

    const authenticated = await isAuthenticated();
    // if (authenticated) {
    //     redirect('/dashboard');
    const user = await getUser();
    if (!user) {
        return redirect("/")
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