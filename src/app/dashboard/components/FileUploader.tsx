"use client";

import Uppy from '@uppy/core';
import { Dashboard } from '@uppy/react';
import XHRUpload from '@uppy/xhr-upload';
import '@uppy/core/dist/style.css';
import '@uppy/dashboard/dist/style.css';
import { useSession } from '@kinde-oss/kinde-auth-nextjs';
import { useEffect, useRef, useState } from "react";


export default function FileUploader ({onUploaded} : { onUploaded?: (url: string) => void }) {
  const { user } = useSession();
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const uppyRef = useRef<Uppy.Uppy | null>(null);

  useEffect(() => {
    if (!user) return;

    uppyRef.current = new Uppy({
      restrictions: {
        maxNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      },
      autoProceed: true,
    })

    uppyRef.current.use(XHRUpload, {
      endpoint: '/api/upload',
      fieldName: 'file',
      headers: {
        'x-user-id': user.id,
      }
    });


    uppyRef.current.on('upload-success', (file, response) => {
      const body = response.body as { url: string };
      setImageUrls ((prev) => {
        const newUrls = [...prev, body.url];
        if (onUploaded) onUploaded(body.url);
        return newUrls;
      });
    });

    // const uppy = new Uppy({
    //   restrictions: {
    //     maxNumberOfFiles: 1,
    //     allowedFileTypes: ['image/*']
    //   },
    //   autoProceed: true
    // });

    // uppy.use(XHRUpload, {
    //   endpoint: '/api/upload',
    //   fieldName: 'file',
    //   headers: {
    //     'x-user-id': user.id,
    //   }
    // });

    // uppy.on('upload-success', (file, response) => {
    //   const body = response.body;
    //   setImageUrls ((prev) => {
    //     const newUrls = [...prev, body.url];
    //     if (onUploaded) onUploaded(newUrls);
    //     return newUrls;
    //   });
    // });

    // return () => uppy.close();

    return () => {
      uppyRef.current?.close();
      uppyRef.current = null;
    }
  }, [user, onUploaded]);

  if (!uppyRef.current) return null;


  return (
    <>
    <Dashboard uppy = {uppyRef.current}/>
  {imageUrls.map((url, index) => (
    <input key={index} type= "hidden" name= "images" value= {url} />
  ))}
  </>
  )
}
