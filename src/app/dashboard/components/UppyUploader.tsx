"use client"

import { useEffect, useState, useRef } from "react";
import Uppy, { UppyFile, UploadResult } from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";
import ImageEditor from "@uppy/image-editor";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "@uppy/image-editor/dist/style.min.css";


export default function UppyUploder() {
  const [uppy] = useState(() => {
    const uppyInstance = new Uppy({
      id: "file-uploader",
      restrictions: {
         maxNumberOfFiles: 5,
        allowedFileTypes: [".jpg", ".png", ".jpeg", ".pdf"],
      },
      autoProceed: true,
     });

uppyInstance.use(ImageEditor, {
  cropperOptions: {
    aspectRatio: undefined,
    viewMode: 1,
  },
  actions: {
    revert: true,
    rotate: true,
    granularRotate: true,
    flip: true,
    zoomIn: true,
    zoomOut: true,
    cropSquare: true,
    cropWidescreen: true,
    cropWidescreenVertical: true,
  },
});

uppyInstance.use(XHRUpload, {
  endpoint: "/api/upload",
  fieldName: "file",
});
    return uppyInstance;
  });



  useEffect(() => {

    const successHandler = (file, response) => {
      console.log("File uploaded successfully:", file.name);
      console.log("Server response:", response);
    };

    const errorHandler = (file, error) => {
      console.error("Error uploading file:" , file.name);
      console.error("Error details:", error);
    };

    const completeHandler = (result) => {
      console.log("Upload complete! Files:", result.successful);
    };

    uppy.on("upload-success", successHandler);
    uppy.on("upload-error", errorHandler);
    uppy.on("complete", completeHandler);


    return () => {
      uppy.off("upload-success", successHandler);
      uppy.off("upload-error", errorHandler);
      uppy.off("complete", completeHandler);

    }

  }, [uppy]);

  return (
    <div className= "p-4">
      <h2 className= "text-xl font-extrabold mb-4">Upload Your Files</h2>
      <Dashboard
      uppy = {uppy}
      height = {450}
      showProgressDetails = {true}
      note = "Accepted file types: jpg, gif, png, pdf. Maximum size per photo: 10MB"
      proudlyDisplayPoweredByUppy={false}
      showLinkToFileUploadResult={false}
      showRemoveButtonAfterComplete={false}
      />
    </div>
  )
}




// export default function UppyUploader ({ onUploadComplete } : { onUploadComplete: (urls: string[]) => void}) {
//
//
//   const uppyRef = useRef<Uppy | null>(null);
//
//   useEffect(() => {
//     const uppy = new Uppy({
//       restrictions: {
//         maxNumberOfFiles: 5,
//         allowedFileTypes: ["image/*"],
//       },
//       autoProceed: true,
//     });
//
//     uppy.use(XHRUpload, {
//       endpoint: "/api/upload",
//       fieldName: "file",
//       formData: true,
//     })
//
//     uppy.on("complete", (result) => {
//       const urls = result.successful.map((f) => f.response?.body?.url);
//       onUploadComplete(urls);
//     });
//
//     uppyRef.current = uppy;
//     return () => uppy.close();
//
//   }, [onUploadComplete]);
//
//   return (
//     <>
//
//         <Dashboard
//           uppy={uppyRef.current}
//           proudlyDisplayPoweredByUppy = {false}
//           height={300}
//         />
//
//
//       </>
//   )
//
// }
//





// // components/UppyUploader.tsx
// "use client";
//
// import React, { useEffect, useRef } from "react";
// import Uppy from "@uppy/core";
// import { Dashboard } from "@uppy/react";
// import XHRUpload from "@uppy/xhr-upload";
//
// import "@uppy/core/dist/style.css";
// import "@uppy/dashboard/dist/style.css";
//
// export default function UppyUploader({ userId }: { userId: string }) {
//   useEffect(() => {
//     const uppy = new Uppy({
//       restrictions: {
//         maxNumberOfFiles: 3,
//         allowedFileTypes: ["image/*"],
//       },
//       autoProceed: false,
//     });
//
//     uppy.use(XHRUpload, {
//       endpoint: "/api/upload",
//       fieldName: "file",
//       headers: {
//         "x-user-id": userId,
//       },
//     });
//
//     return () => uppy.close();
//   }, [userId]);
//
//   return <Dashboard proudlyDisplayPoweredByUppy={false} />;
// }
//
//








