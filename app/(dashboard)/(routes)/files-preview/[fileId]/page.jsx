"use client"
import React, { useEffect, useState } from 'react';
import { getDoc, getFirestore, updateDoc, doc } from "firebase/firestore";
import { app } from '../../../../../firebaseConfig';
import { ArrowLeftSquare } from 'lucide-react';
import FileInfo from './_components/FileInfo';
import FileShareForm from './_components/FileShareForm';
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { use } from 'react';

function FilePreview({params}) {
 // Correctly unwrap params
    const db = getFirestore(app);
    const [file, setFile] = useState(null);
    params=React.use(params);

    useEffect(() => {
        if (params?.fileId) {
            console.log(params.fileId);
            getInfo();
        }
    }, [params]); // Add params as dependency

    const getInfo = async () => {
        const docRef = doc(db, "uploadedFiles", params.fileId); // Fix property name
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Document Data: ", docSnap.data());
            setFile(docSnap.data());
        } else {
            console.log("No such document!!");
        }
    };

    const onPasswordSave = async (password) => {
        const docRef = doc(db, "uploadedFiles", params.fileId);
        await updateDoc(docRef, { password });
        toast.success("Password saved successfully!");
        console.log("Password saved:", password);
    };

    return (
        <div className="py-10 px-20  text-white min-h-screen">
          <ToastContainer />
          <Link href="/upload" className="flex gap-3 text-white items-center">
            <ArrowLeftSquare className="w-6 h-6" />
            <span>Go To Upload</span>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-4">
            <FileInfo file={file} />
            <FileShareForm file={file} onPasswordSave={onPasswordSave} />
          </div>
        </div>
    );
}

export default FilePreview;
