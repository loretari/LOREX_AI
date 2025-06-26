import { DashboardHeader } from "./sections/DashboardHeader";
// import { Button } from "../../components/ui/button";
import Link from "next/link";
import { prisma } from "../lib/prisma";
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import { Edit, File, Trash } from "lucide-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile } from '@fortawesome/free-solid-svg-icons'
import { Button } from "../../components/Buttons";
import { Card } from "../../components/ui/card";
import { TrashDelete } from "./components/SubmitButtons";
import {revalidatePath, unstable_noStore as noStore} from "next/cache";
import { redirect } from "next/navigation";


async function getData(userId: string) {
  // const data = await prisma.note.findMany({
  //   where: {
  //     userId: userId,
  //   },
  //       orderBy: {
  //         createdAt: "desc",
  //       },
  //
  // });
  noStore();
  const data = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      Notes: {
        select: {
          title: true,
          id: true,
          description: true,
          createdAt: true,
      } ,
        orderBy: {
          createdAt: "desc",
        },
  },
      Payment: {
        orderBy: {
          createdAt: "desc",
        },
        take: 1,
        select: {
          status: true,
        }
      }
    }

  })

  return data;
}

export default async function DashboardPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect("/api/auth/login");
  }
  const data = await getData(user?.id as string);
  const firstPayment = data?.Payment?.[0];


  async function deleteNote(formData: FormData) {
    "use server"
    const noteId = formData.get('noteId') as string;

    await prisma.note.delete({
      where: {
        id: noteId,
      },
    });

    revalidatePath("/dashboard")
  }

    return (
        <div className= "grid items-start gap-y-8">
          <div className= "flex items-center justify-between px-2">
            <div className= "grid gap-1">
              <h1 className= "text-3xl md:text-4xl">Jūsų užrašai</h1>
              <p className= "text-lg text-muted-foreground">
                Čia galite peržiūrėti ir kurti naujus užrašus
              </p>
            </div>
            {/*<Link href= "/dashboard/new">*/}
            {/*<Button>*/}
            {/*    Sukurti naują įrašą*/}
            {/*</Button>*/}
            {/*</Link>*/}


            {/*{data?.Payment?.status === 'active' ? (*/}
            {firstPayment?.status === 'succeeded' ? (
                <Link href= "/dashboard/new">
              <Button>
                Sukurti naują įrašą
            </Button>
            </Link>
            ) : (
            <Link href= "/dashboard/billing">
            <Button>
                Sukurti naują įrašą
            </Button>
            </Link>
            )}


          </div>

          {data?.Notes.length == 0 ? (
          /*  {data.length < 1 ? (*/
            <div className= "flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
              <div className= "flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 hover:bg-popover-foreground">
                <File className= "w-10 h-10 text-violet-400" />
              </div>

              <h2 className="mt-6 text-xl font-semibold">
                Jūs nesate sukūręs jokių užrašų
              </h2>
              <p className="mb-8 mt-2 text-center text-sm leading-6 text-muted-foreground max-w-sm mx-auto">
                Šiuo metu Jūs dar neturite jokių užrašų. Juos galite sukurti čia ir jie vėliau bus matomi Jūsų užrašinėje.
              </p>

              {/*<Link href= "/dashboard/new">*/}
              {/*  <Button>*/}
              {/*    Sukurti naują įrašą*/}
              {/*  </Button>*/}
              {/*</Link>*/}


              {data?.Payment?.status === 'succeeded' ? (
                <Link href= "/dashboard/new">
                  <Button>
                    Sukurti naują įrašą
                  </Button>
                </Link>
              ) : (
                <Link href= "/dashboard/billing">
                  <Button>
                    Sukurti naują įrašą
                  </Button>
                </Link>
              )}

            </div>
          ) : (
            <div className= "flex flex-col gap-y-8">
              {data?.Notes.map((item) => (
                 // {data.map((item) => (
                <Card
                key={item.id}
                className= "flex items-center justify-between px-4 bg-primary border-gradient "
                // className="mt-20 rounded-2xl border-2 bg-primary border-gradient"
                >
                  <div>
                    <h2 className= "font-semibold text-2xl text-muted-foreground">{item.title}</h2>
                    <p className= "font-semibold text-xl text-violet-400">{item.description}</p>
                    <p className= "text-muted-foreground">
                      {new Intl.DateTimeFormat("en-US", {
                        dateStyle: "full",
                      }).format(new Date(item.createdAt))}
                    </p>
                  </div>
                  
                  <div className= "flex gap-x-4 text-muted-foreground">
                    <Link href={`/dashboard/new/${item.id}`}>
                      <Button variant= "outline" size="icon" >
                        <Edit className= "w-4 h-4"/>
                      </Button>
                    </Link>
                    <form action={deleteNote}>
                      <input
                       type= "hidden"
                       name= "noteId"
                       value={item.id}
                      />
                    <TrashDelete/>
                    </form>
                  </div>
                  
                </Card>
              ))}

            </div>
          )}
                  </div>
    )
}

