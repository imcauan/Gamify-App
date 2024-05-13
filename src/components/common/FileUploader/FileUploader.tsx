"use client"
import { convertFileToURL } from "@/lib/utils"
import { ImageUp } from "lucide-react"
import { useCallback, useState } from "react"
import { FileWithPath, useDropzone } from "react-dropzone"

interface FileUploaderProps {
    mediaUrl: string,
    fieldChange: (files: File[]) => void
}


const FileUploader = ({ mediaUrl, fieldChange }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(convertFileToURL(acceptedFiles[0]))
    },
    [file]
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
        "image/*": [".png", ".jpeg", ".jpg", ".svg"]
    }
  })

  return (
    <div 
      {...getRootProps()}
      className="bg-zinc-900 w-full rounded p-4 justify-center items-center"
      
    >
        <input {...getInputProps()} className="cursor-pointer"/>
        { fileUrl ? (
          <img src={fileUrl} alt="" className="w-full"/>
        ) : (
        <>
           <div className="flex flex-col text-center  items-center">
           <ImageUp className="text-red-600 mt-2" width={45} height={45}/>
             <p className="text-white font-semibold">Drag photo here</p>
             <p className="text-medium text-zinc-600">SVG, PNG, JPG</p>
           </div>
        </>
        )}
    </div>
  )
}

export default FileUploader