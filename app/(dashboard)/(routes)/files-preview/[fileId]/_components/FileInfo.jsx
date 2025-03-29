import Image from "next/image";
import { useEffect, useState } from "react";

export default function FileInfo({ file }) {
  const [fileType, setFileType] = useState();

  useEffect(() => {
    if (file) {
      setFileType(file?.fileType.split('/')[0]);
      console.log(fileType);
    }
  }, [file]);

  const trimName = (name )=>{
    if(name.length > 35) return name.slice(0, 35) + "...";
    else return name;
  }

  return (
    file && (
      <div className="text-center border border-gray-700 flex justify-center m-4 flex-col items-center p-4 rounded-lg text-white shadow-lg">
        <Image
          src={fileType === 'image' ? file?.fileUrl : 'https://www.selikoff.net/blog-files/null-value.gif'}
          width={400}
          height={400}
          className="h-[200px] rounded-md object-contain"
          alt=""
        />
        <div>
          <h2 className="text-lg font-semibold mt-2">{trimName(file.fileName)}</h2>
          <h2 className="text-gray-400 text-sm">{file.shortUrl}</h2>
        </div>
      </div>
    )
  );
}