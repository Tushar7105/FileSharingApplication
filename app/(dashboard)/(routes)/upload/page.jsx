"use client"
import React, { useEffect, useState } from 'react'
import UploadForm from './_components/UploadForm'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { useUser } from '@clerk/nextjs';
import { generateRandomString } from '../../../../app/_utils/GenerateRandomString';
import { useRouter } from "next/navigation";
import Link from "next/link";
import { app } from '../../../../firebaseConfig';


function upload() {
  const { user } = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  // const [uploadCompleted, setUploadCompleted] = useState(false);
  const [fileDocId, setFileDocId] = useState();
  const db = getFirestore(app);
  const storage = getStorage(app)
  const uploadFile = (file) => {
    const spaceRef = ref(storage, `FileUploaded/${file.name}`);
    const uploadTask = uploadBytesResumable(spaceRef, file, file.type);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Progress updates
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
        console.log('Upload is ' + progress + '% done');
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error('Upload error:', error);
      },
      () => {
        // Handle successful uploads on complete
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          saveInfo(file, downloadURL);
        });
      }
    );
    
  }
  const saveInfo = async (file, fileUrl) => {
    try {
      console.log(file, fileUrl)
      console.log(user.primaryEmailAddress.emailAddress, user.fullName)
      console.log(process.env.NEXT_PUBLIC_BASE_URL)
      const docId = generateRandomString().toString();
      console.log(docId)
      await setDoc(doc(db, "uploadedFiles", docId), {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size,
        fileUrl: fileUrl,
        userEmail: user.primaryEmailAddress.emailAddress,
        userName: user.fullName,
        password: "",
        id: docId,
        shortUrl: process.env.NEXT_PUBLIC_BASE_URL + docId,
      })
      setFileDocId(docId);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='p-5 px-8 md:px-28'>
      <h2 className='text-[20px] text-center m-5'>Start <strong className='text-primary'>Uploading</strong> Files and <strong className='text-primary'>Share</strong> it</h2>
      <UploadForm UploadBtnClick={(file) => uploadFile(file)} progress={progress} />
      {progress === 100 && (
        <div className="flex justify-center items-center mt-4">
          <button className="p-2 bg-gray-50 text-black w-[30%] rounded-full mt-5 disabled:bg-gray-400">
            <Link href={`http://localhost:3000/files-preview/${fileDocId}`}>
              Go To file Preview
            </Link>
          </button>
        </div>
      )}
    </div>
  )
}

export default upload