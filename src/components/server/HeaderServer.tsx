import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { Header } from "../../sections/Header";
import {redirect} from "next/navigation";

export const HeaderServer = async () => {
    const {isAuthenticated} = getKindeServerSession();

    const authenticated = await isAuthenticated();
//       if ( authenticated) {
//     redirect('/dashboard');
// }

    return (
        <Header isAuthenticated={authenticated}/>
    )


}

export default HeaderServer;