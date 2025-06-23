import type { Metadata } from "next";
import { Sora, Space_Grotesk } from "next/font/google";
import "../globals.css";
import Header from "../../sections/Header";
import HeaderServer from "../../components/server/HeaderServer";
import {DashboardHeaderServer} from "../../components/server/DashboardHeaderServer";
import DashboardLayout from "./sections/DashboardLayout";
import {DashboardNav} from "./components/DashboardNav";
import {prisma} from "../lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";




const soraFont = Sora({
    subsets: ["latin-ext"],
    variable: "--font-sora",
    weight: "variable",
});
const spaceGroteskFont = Space_Grotesk({
    subsets: ["latin"],
    variable: "--font-space-grotesk",
    weight: "variable",
});

export const metadata: Metadata = {
    title: "AI SaaS Landing Page",
    description: "Created by Frontend Tribe",
};

async function getData(userId: string) {
    if (userId) {
        const data = await prisma.user.findUnique({
            where: {
                id: userId,
            },
            // select: {
            //     colorScheme: true,
            // },
        });
        return data;
    }


}

export default async function Layout({ children }: { children: React.ReactNode }) {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);



    return (
      <div
        lang="en"
        className={`${soraFont.variable} ${spaceGroteskFont.variable} ${data?.colorScheme} antialiased bg-gray-900 text-gray-300 font-body`}
      >
          <DashboardHeaderServer />
          <div className="flex-1">
              <DashboardLayout>
                  {children}
              </DashboardLayout>
          </div>
      </div>
    );
}


// export default async function Layout({
//                                        children,
//                                    }: Readonly<{
//     children: React.ReactNode;
// }>) {
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();
//     const data = await getData(user?.id as string);
//     return (
//         <html lang="en">
//         <body
//             className= {`${soraFont.variable} ${spaceGroteskFont.variable}  ${data?.colorScheme} antialiased bg-gray-900 text-gray-300 font-body`}
//         >
//             <DashboardHeaderServer/>
//         <div className= "flex-1">
//             <DashboardLayout>
//                 {children}
//             </DashboardLayout>
//         </div>
//         </body>
//         </html>
//     );
// }


