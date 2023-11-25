import { useInfo } from "@/context/info";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { StaticImageData, StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";
import DefaultTextbook from "@/Images/defaultTextbook.jpg";
import Textbook from "@/pages/type";

interface Props {
  textbook: Textbook;
}

function Goods(props: Props) {
  const { textbook } = props;
  const {schoolCode} = useInfo()
  const photoUrl: string | StaticImport = textbook?.seller.photoUrl as string;
  const [ImageUrl, setImageUrl] = useState<string | StaticImageData>(DefaultTextbook);
  // const id = process.browser ? location.pathname : "";
  // const url = id.substring(14);
  if(textbook.textbookImg){
    const pathReference = ref(storage, `textbook/${schoolCode}/${textbook?.textbookImg}`);
    getDownloadURL(pathReference).then((response) => {
      setImageUrl(response);
    });
  }

  return (
    <div className="w-60 bg-gray-500 hover:opacity-80">
      <div className="bg-slate-200 flex">
        <div className="w-8 h-8">
          <Image src={photoUrl} width={50} height={50} alt="プロフィール写真" />
        </div>
        <p className="align-middle ml-4 truncate text-xl">
          {textbook?.textbookName}
        </p>
      </div>
      <div className="h-80 relative">
        <Image
          src={ImageUrl}
          alt="商品写真"
          fill
          style={{
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}

export default Goods;
