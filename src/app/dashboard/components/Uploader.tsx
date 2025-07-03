"use client"

import { cn } from "../../../lib/utils";
import { useDropzone } from "react-dropzone";
import { useCallback } from "react";
import {
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle
} from "../../../components/ui/card";
import { Button } from "../../../components/Buttons";

export function Uploader() {

  const onDrop = useCallback ((acceptedFiles: File[]) => {
   console.log(acceptedFiles)
  }, []);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  return (
    <Card className={cn(
      "relative border-2 border-dashed transition-colors duration-200 ease-in-out w-full h-64"
    )}
     {...getRootProps()}
      >
      <CardContent className= "flex items-center justify-center h-full w-full">
<input {...getInputProps()}/>
      {isDragActive ?
          <p className= "text-center">Drop the files here ...</p> :
        <div className= "flex flex-col items-center justify-center h-full w-full gap-y-8">
          <p >Drag 'n' drop some files here, or click to select files</p>
          <Button className= "text-muted-foreground">Įkelti nuotrauką</Button>
        </div>

      }
      </CardContent>
    </Card>
  )
}
