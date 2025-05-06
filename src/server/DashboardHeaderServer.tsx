import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";

import DashboardHeader from "../app/dashboard/sections/DashboardHeader";

export const DashboardHeaderServer = async () => {
    const {isAuthenticated, getUser} = getKindeServerSession();
    const authenticated = await isAuthenticated();
    const user = await getUser();



    return (
        <DashboardHeader isAuthenticated={authenticated} user={user}/>
    )


}

export default DashboardHeaderServer;