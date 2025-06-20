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



export default async function NewNoteRoute() {
  const {getUser} = getKindeServerSession();
  const user = await getUser();

  async function postData(formData : FormData) {
    "use server";

    if (!user) {
      throw new Error("Norėdami tęsti, prisijunkite prie savo paskyros.");
    }


    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.note.create({
      data: {
        userId: user?.id,
        description: description,
        title: title,
      },
    });

    return redirect('/dashboard');
  }


  return (
    <Card className="mt-20 rounded-2xl border-2 bg-primary border-gradient">
      <form action={postData}>
        <CardHeader>
          <CardTitle className= "text-violet-400 text-3xl md:text-4xl">Naujas įrašas</CardTitle>
          <CardDescription className= "text-lg text-muted-foreground">
            Čia galite kurti naujus savo įrašus
          </CardDescription>
        </CardHeader>
        <CardContent className= "flex flex-col gap-y-8">
          <div className= "gap-y-2 flex flex-col">
           <Label>Title</Label>
            <Input
            required
            type= "text"
            name= "title"
            placeholder= "Jūsų įrašo pavadinimas"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
            name= "description"
            placeholder= "Sukurkite savo įrašo pavadinimą tokį, kokio norite"
            required
            />
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