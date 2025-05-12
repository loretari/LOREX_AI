
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "../../../components/ui/card";
import {Label} from "../../../components/ui/label";
import {Input} from "../../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup, SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "../../../components/ui/select";
import {prisma} from "../../lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {Button} from "../../../components/Buttons";
import {SubmitButton} from "../components/SubmitButtons";
import {revalidatePath} from "next/cache";


async function getData(userId: string) {
    const data = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            name: true,
            email: true,
            colorScheme: true,
        },
    });
    return data;
}


export default async function SettingPage() {
    const { getUser } = getKindeServerSession();
    const user = await getUser();
    const data = await getData(user?.id as string);

    async function postData(formData: FormData) {
        "use server";

        const name = formData.get("name") as string;
        const colorScheme = formData.get("color") as string;

        await prisma.user.update({
            where: {
                id: user?.id,
            },
            data: {
                name: name,
                colorScheme: colorScheme,
            },
        });
        revalidatePath('/', "layout")
    }



    return (
        <div className= "grid items-start gap-8">
            <div className= "flex items-center justify-between px-2">
                <div className= "grid gap-1">
                    <h1 className= "text-3xl md:text-4xl">Settings</h1>
                    <p className= "text-lg text-muted-foreground">Your Profile Settings</p>
                </div>
            </div>

            <Card className="mt-20 rounded-2xl border-2 bg-primary border-gradient" >
                {/*    <Card className= "mt-20 rounded-2xl border-2 overflow-hidden border-gradient relative flex">*/}
                <form action= {postData}>
                    <CardHeader >
                        <CardTitle className= "text-violet-400 text-3xl md:text-4xl">General Data</CardTitle>
                        <CardDescription className= "text-lg text-muted-foreground">Please provide general information about yourself. Please don't forget to save</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className= "space-y-2">
                            <div className= "space-y-1">
                                <Label>Your Name</Label>
                                <Input
                                    name= "name"
                                    type= "text"
                                    id= "name"
                                    placeholder= "Your Name"
                                    defaultValue={data?.name}
                                />

                            </div>
                            <div className= "space-y-1">
                                <Label>Your Email</Label>
                                <Input
                                    name= "email"
                                    type= "email"
                                    id= "email"
                                    placeholder= "Your Email"
                                    disabled
                                    defaultValue={data?.email as string}
                                />
                            </div>

                            <div className= "space-y-1">
                                <Label>
                                    Color Scheme
                                </Label>
                                <Select name= "color" defaultValue={data?.colorScheme}>
                                    <SelectTrigger className= "w-full">
                                        <SelectValue placeholder= "Select a color"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Color</SelectLabel>
                                            <SelectItem value= "theme-violet">Green</SelectItem>
                                            <SelectItem value= "theme-fuchsia">Fuchsia</SelectItem>
                                            <SelectItem value= "theme-amber">Amber</SelectItem>
                                            <SelectItem value= "theme-teal">Teal</SelectItem>
                                            <SelectItem value= "theme-gray">Gray</SelectItem>
                                            <SelectItem value= "theme-indigo">Indigo</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                        </div>
                    </CardContent>

                    <CardFooter>
                        <SubmitButton />
                    </CardFooter>
                </form>
            </Card>
        </div>
    )
}










// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../components/ui/card";
// import { Label } from "../../../components/ui/label";
// import { Input } from "../../../components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectGroup,
//     SelectItem,
//     SelectLabel,
//     SelectTrigger,
//     SelectValue,
// } from "../../../components/ui/select";
// import { Button } from "../../../components/Buttons";
// import { prisma } from "../../lib/prisma";
// import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
// import { revalidatePath } from "next/cache";
//
// // Galite susikurti atitinkamą Order tipą DB
// // async function createOrder(data) {
// //     return prisma.order.create({
// //         data,
// //     });
// // }
// // export default async function OrderPage() {
// export default async function OrderPage() {
//     const { getUser } = getKindeServerSession();
//     const user = await getUser();
//
//     async function postOrder(formData: FormData) {
//         'use server';
//         const name = formData.get('name') as string;
//         const email = formData.get('email') as string;
//         const plan = formData.get('plan') as string;
//         const notes = formData.get('notes') as string;
//         const files = formData.getAll('files') as File[];
//
//         // TODO: saugoti bylas ir gauti URL
//         const fileUrls = [];
//         for (const file of files) {
//             // pavyzdžiui, upload į S3 ar kitur
//             // const url = await uploadFile(file);
//             // fileUrls.push(url);
//         }
//
//         // await createOrder({
//         //     userId: user?.id,
//         //     name,
//         //     email,
//         //     plan,
//         //     notes,
//         //     attachments: fileUrls,
//         // });
//         // revalidatePath('/orders');
//         revalidatePath('/');
//     }
//
//     return (
//         <div className="grid items-start gap-8">
//             <div className="flex items-center justify-between px-2">
//                 <div className="grid gap-1">
//                     <h1 className="text-3xl md:text-4xl">Užsakymo forma</h1>
//                     <p className="text-lg text-muted-foreground">Prašome pateikti savo užsakymą</p>
//                 </div>
//             </div>
//
//             <Card className="mt-20 rounded-2xl border-2 bg-primary border-gradient">
//                 {/*<form action={postOrder} encType="multipart/form-data">*/}
//                 <form >
//
//                 <CardHeader>
//                         <CardTitle className="text-violet-400 text-3xl md:text-4xl">Užsakymo informacija</CardTitle>
//                         <CardDescription className="text-lg text-muted-foreground">
//                             Pasirinkite planą, įkelkite drabužių nuotraukas ir pateikite pastabas.
//                         </CardDescription>
//                     </CardHeader>
//
//                     <CardContent>
//                         <div className="space-y-4">
//                             <div className="space-y-1">
//                                 <Label>Jūsų vardas</Label>
//                                 <Input name="name" type="text" placeholder="Vardas" defaultValue={user?.name ?? ''} />
//                             </div>
//
//                             <div className="space-y-1">
//                                 <Label>El. paštas</Label>
//                                 <Input name="email" type="email" placeholder="Email" defaultValue={user?.email ?? ''} />
//                             </div>
//
//                             <div className="space-y-1">
//                                 <Label>Pasirinkite planą</Label>
//                                 <Select name="plan" defaultValue="Mini">
//                                     <SelectTrigger className="w-full">
//                                         <SelectValue placeholder="Pasirinkti planą" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectGroup>
//                                             <SelectLabel>Planai</SelectLabel>
//                                             <SelectItem value="Mini">Mini (€15): 1 modelis</SelectItem>
//                                             <SelectItem value="Standartinis">Standartinis (€30): 2–3 modeliai</SelectItem>
//                                             <SelectItem value="Individualus">Individualus: >5 modelių</SelectItem>
//                                         </SelectGroup>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//
//                             <div className="space-y-1">
//                                 <Label>Drabužių nuotraukos</Label>
//                                 <Input name="files" type="file" multiple />
//                             </div>
//
//                             <div className="space-y-1">
//                                 <Label>Pastabos</Label>
//                                 <textarea
//                                     name="notes"
//                                     placeholder="Papildomi pageidavimai, pvz. fonas, pozos"
//                                     className="w-full rounded-md border border-gray-300 p-2"
//                                     rows={4}
//                                 />
//                             </div>
//                         </div>
//                     </CardContent>
//
//                     <CardFooter>
//                         <Button type="submit">Pateikti užsakymą</Button>
//                     </CardFooter>
//                 </form>
//             </Card>
//         </div>
//     );
//
// }






