 import {Card} from "../../../components/ui/card";
 import { Check } from "lucide-react";

 import Link from "next/link";
 import {Button} from "../../../components/ui/button"


 export default function CancelledRoute() {
     return (
         <div className= "w-full min-h-[80vh] flex items-center justify-center ">
             <Card className= "w-[350px]  ">
                 <div className= "px-6">
                     <div className= "w-full flex justify-center">
                         <Check className= "w-12 h-12 rounded-full bg-green-500/30 text-green-500 p-2" />
                     </div>

                     <div className= "mt-3 text-center sm:mt-5 w-full">
                         <h3 className= "text-lg leading-6 font-medium">Payment Successful</h3>
                         <div className= "mt-2">
                           <p className= "text-sm text-muted-foreground" >Congrats on your payment, please check your email for further instructions>
                           </p>
                         </div>

                       <div className= "mt-5 sm:mt-6 w-full">
                       <Button className="text-muted-foreground">
                         <Link href= "/">Go back to Dashboard</Link>
                       </Button>
                       </div>

                     </div>
                 </div>
             </Card>
         </div>
     )
 }