import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "../../../components/ui/card";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/Buttons";
import Link from "next/link";
import { SubmitButton } from "../components/SubmitButtons";
import { prisma } from "../../lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { unstable_noStore as noStore} from "next/cache";
import UppyUploder from "../uppy/UppyUploader";
import FileUploader from "../uppy/FileUploader";
import { red } from "next/dist/lib/picocolors";
import { Uploader } from "../components/Uploader";






export default async function NewNoteRoute() {
  noStore();

  const {getUser} = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }



  //
  // if (!user) {
  //   redirect('/login');
  // }
  //
  // const data = await prisma.user.findUnique({
  //   where: {
  //     id: user.id,
  //   },
  //   select: {
  //     Payment: {
  //       select: {
  //         status: true,
  //       }
  //     }
  //   }
  // });
  //
  // console.log("Mokėjimo būsena:", payment);
  //
  // if (data?.Payment?.status !== 'active') {
  //   redirect('/dashboard/billing');
  // }

  async function postData(formData : FormData) {
    "use server";


    // const paymentStatus = await prisma.payment.findFirst({
    //   where: {
    //     userId: user.id
    //   }
    // });
    //
    // if (paymentStatus?.status !== 'active') {
    //   throw new Error ("Jūs nesate užsakęs palsaugos, dėl to negalite kurti įrašų")
    // }

    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const images = formData.getAll("images") as string[];

    await prisma.note.create({
      data: {
        userId: user?.id,
        description: description,
        title: title,
        images: images,
      },
    });

    return redirect('/dashboard');

  }


  return (
    <Card className="mt-2 rounded-2xl border-2 bg-primary border-gradient">

      <form action={postData}>

        <CardHeader>
          <CardTitle className= "text-violet-400 text-3xl md:text-4xl">Naujas įrašas</CardTitle>
          <CardDescription className= "text-lg text-muted-foreground">
            Čia galite kurti naujus savo įrašus
          </CardDescription>
        </CardHeader>
        <CardContent className= "flex flex-col gap-y-8">
          <div className= "gap-y-4 flex flex-col">
           <Label className= "text-white text-lg">Pavadinimas</Label>
            <Input
            required
            type= "text"
            name= "title"
            placeholder= "Jūsų įrašo pavadinimas"
            />
          </div>

          <div className= "gap-y-4 flex flex-col">
            <Label className= "text-white text-lg">Aprašymas</Label>
            <Textarea
            name= "description"
            placeholder= "Sukurkite savo įrašo pavadinimą tokį, kokio norite"
            required
            />
          </div>

          <div className= "gap-y-4 flex flex-col">
            <Label className= "text-white text-lg">Nuotrauka</Label>
            {/*<Input*/}
            {/*  type= "file"*/}
            {/*  name= "image"*/}
            {/*  accept= "image/*"*/}
            {/*  multiple*/}
            {/*  placeholder= "Įkelkite nuotraukas, kurios turi būti panaudotus Jūsų užsakymo vykdymui"*/}
            {/*  required*/}
            {/*/>*/}
            {/*<div className="max-w-2xl mx-auto flex min-h-screen flex-col items-center justify-center ">*/}
            {/*  <h1 className="text-white text-4xl font-bold pb-10">Upload your Files with S3 📂</h1>*/}
              <Uploader />
            {/*</div>*/}


            {/*<UppyUploder userId={user.id}/>*/}
            {/*<FileUploader*/}
            {/*  onUploaded={(urls) => {*/}
            {/*    console.log("Įkeltos nuotraukos:", urls)*/}

            {/*  }}*/}
            {/*/>*/}


          </div>

        </CardContent>

        <CardFooter className= "flex justify-between ">
          <Link href= "/dashboard">
            <Button className= "text-violet-400">
              Atšaukti
            </Button>
          </Link>
          <SubmitButton />
        </CardFooter>

      </form>
    </Card>

  )
}