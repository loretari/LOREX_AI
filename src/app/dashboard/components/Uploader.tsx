"use client"

import { cn } from "../../../lib/utils";
import { FileRejection, useDropzone } from "react-dropzone";
import { useCallback, useState } from "react";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "../../../components/ui/card";
import { Button } from "../../../components/Buttons";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Input } from "../../../components/ui/input";

export function Uploader() {
  const [files, setFiles] = useState<
    Array<{
       id: string;
       file: File;
       uploading: boolean;
       progress: number;
       key?: string;
       iseDeleting: boolean;
       error: boolean;
       objectUrl?: string;
    }>
    >([])

  const onDrop = useCallback ((acceptedFiles: File[]) => {
   console.log(acceptedFiles)
  }, []);

  const onDropRejected = useCallback ((fileRejections: FileRejection[]) => {
    console.log(fileRejections)


    if (fileRejections.length > 0) {
      const tooManyFiles = fileRejections.find(
        (fileRejections) => fileRejections.errors[0].code === "too-many-files"
      );

      const fileTooLarge = fileRejections.find(
        (fileRejections) => fileRejections.errors[0].code === "file-too-large"
      );

      if (tooManyFiles) {
        toast.error(
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <strong className="block text-lg font-semibold">Klaida!</strong>
              <p>Jūs galite įkelti tik 5 nuotraukas vieno užsakymo metu.</p>
            </div>
          </div>,
          {
            duration: 7000,
            style: {
              borderRadius: '10px',
              border: '2px solid #dc2626',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
              fontWeight: '600',
            }
          }
        );
      }

      if (fileTooLarge) {
        toast.error(
          <div className="flex items-center gap-3">
            <AlertCircle className="w-6 h-6 text-red-600" />
            <div>
              <strong className="block text-lg font-semibold">Klaida!</strong>
              <p>Nuotraukų dydis yra per didelis.</p>
            </div>
          </div>,
          {
            duration: 7000,
            style: {
              borderRadius: '10px',
              border: '2px solid #dc2626',
              backgroundColor: '#fee2e2',
              color: '#b91c1c',
              boxShadow: '0 4px 15px rgba(220, 38, 38, 0.3)',
              fontWeight: '600',
            }
          }
        );
      }
    }
  }, []);


  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    maxFiles:5,
    maxSize: 1024 * 1024 *5,
    accept: {
      "image/*": [],
    },
  });

  return (
    <Card className={cn(
      "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64",
      isDragActive
        ? "border-primary bg-white/10 border-solid "
        : "border-border hover:border-primary"
    )}
     {...getRootProps()}
      >
      <CardContent className= "flex items-center justify-center h-full w-full ">
       <Input {...getInputProps()}/>
      {isDragActive ?
          <p className= "text-center text-violet-400">Drop the files here ...</p> :
        <div className= "flex flex-col items-center justify-center h-full w-full gap-y-8 ">
          <p >Drag 'n' drop some files here, or click to select files</p>
          <Button className= "text-muted-foreground">Įkelti nuotrauką</Button>
        </div>

      }
      </CardContent>
    </Card>
  )
}
