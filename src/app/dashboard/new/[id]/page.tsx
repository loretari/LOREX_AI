import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../../../components/ui/card";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Textarea } from "../../../../components/ui/textarea";
import Link from "next/link";
import { Button } from "../../../../components/Buttons";
import { SubmitButton } from "../../components/SubmitButtons";
import { prisma } from "../../../lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


async function getData({ userId, noteId } : { userId: string; noteId: string }) {
  const data = await prisma.note.findUnique({
    where: {
      id: noteId,
      userId: userId,
    },
    select: {
      title: true,
      description: true,
      id: true,
    }
  })

  return data;
}

export default async function DynamicRoute({
  params,
   } : {
  params: {id: string };
}) {
  const {getUser} = getKindeServerSession()
  const user = await getUser()
  const data = await getData({userId: user?.id as string, noteId: params.id});

  async function postData(formData: FormData) {
    "use server"

    if (!user) throw new Error("Norėdami naudotis šia galimybe, pirmiausia prisijunkite.")


    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    await prisma.note.update({
      where: {
        id: data?.id,
        userId: user.id,
      },
      data: {
        description: description,
        title: title,
      },
    });

    revalidatePath("/dashboard");

    return redirect("/dashboard");

  }

  return (
    <Card className="mt-20 rounded-2xl border-2 bg-primary border-gradient">
      <form action={postData}>
        <CardHeader>
          <CardTitle className= "text-violet-400 text-3xl md:text-4xl">Redaguoti įrašą</CardTitle>
          <CardDescription className= "text-lg text-muted-foreground">
            Čia galite redaguoti savo įrašus
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
              defaultValue={data?.title}
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              name= "description"
              placeholder= "Sukurkite savo įrašo pavadinimą tokį, kokio norite"
              required
              defaultValue={data?.description}
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