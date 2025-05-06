import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { Header } from "../sections/Header";

export const HeaderServer = async () => {
    const {isAuthenticated} = getKindeServerSession();
    const authenticated = await isAuthenticated();


    return (
        <Header isAuthenticated={authenticated}/>
    )


}

export default HeaderServer;