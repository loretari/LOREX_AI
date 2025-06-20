"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../../../components/Buttons"
import { Loader2, Trash } from "lucide-react";




export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
                    <Loader2 className= "mr-2 w-4 h-4 animate-spin"/>
                    Please Wait</Button>
            ) : (
                <Button type= "submit" className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
                    Save now</Button>
            )}
        </>
    )
}


export function StripePaymentCreationButton() {
    const { pending } = useFormStatus();

    return (
        <>
            {pending ? (
                <Button disabled className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
                    <Loader2 className= "mr-2 w-4 h-4 animate-spin"/>
                    Prašome palaukti</Button>
            ) : (
                <Button type= "submit" className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
                    Pirkti šiandieną
                </Button>

                )}
        </>
    );
}

export function StripePortal() {
    const { pending } = useFormStatus();

    return (
      <>
          {pending ? (
            <Button disabled className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
                <Loader2 className= "mr-2 w-4 h-4 animate-spin"/>
                Prašome palaukti</Button>
          ) : (
            <Button type= "submit" className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
                Peržiūrėti mokėjimo informaciją
            </Button>

          )}
          </>
    )
}

export function TrashDelete() {
    const { pending } = useFormStatus();

    return (
      <>
          {pending ? (
            <Button
              variant= "ghost"
              size="icon"
              className="bg-red-500 hover:bg-red-600 text-white"
              disabled
            >
                <Loader2 className= "mr-2 w-4 h-4 animate-spin"/>
               </Button>
          ) : (
            <Button
              variant= "ghost"
              size="icon"
              className="bg-red-500 hover:bg-red-600 text-white"
              type= "submit">
                <Trash className= "h-4 w-4"/>
            </Button>

          )}
      </>
    )
}


// "use client";
// import { useFormStatus } from "react-dom";
// import { Button } from "../../../components/Buttons";
// import { Loader2 } from "lucide-react";
//
// export function SubmitButton() {
//     const { pending } = useFormStatus();
//
//     return (
//         <>
//             {pending ? (
//                 <Button disabled className="text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
//                     <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//                     Please Wait
//                 </Button>
//             ) : (
//                 <Button type="submit" className="text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
//                     Save now
//                 </Button>
//             )}
//         </>
//     );
// }
//
// export function StripePaymentCreationButton() {
//     const { pending } = useFormStatus();
//
//     return (
//         <>
//             {pending ? (
//                 <Button disabled className="text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
//                     <Loader2 className="mr-2 w-4 h-4 animate-spin" />
//                     Please Wait
//                 </Button>
//             ) : (
//                 <Button type="submit" className="w-full text-muted-foreground">
//                     Buy today
//                 </Button>
//             )}
//         </>
//     );
// }




