"use client";
import { useFormStatus } from "react-dom";
import { Button } from "../../../components/Buttons"
import { Loader2 } from "lucide-react";




export function SubmitButton() {
    const { pending } = useFormStatus();

    return (
<>
    {pending ? (
        <Button disabled className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">
            <Loader2 className= "mr-2 w-4 h-4 animate-spin"/>
            Please Wait</Button>
    ) : (
        <Button type= "submit" className= "text-xs tracking-widest uppercase font-bold h-10 px-6 rounded-lg border-gradient text-gray-100">Save now</Button>
    )}%
    </>
    )
}