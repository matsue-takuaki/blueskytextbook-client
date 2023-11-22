import { storage } from "@/lib/firebase";
import { getDownloadURL, ref } from "firebase/storage";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React, { useState } from "react";

interface Props {
  textbook: Textbook;
}

interface User {
  id: number;
  username: String;
  email: String;
  photoUrl: String;
  school: String;
  textbooks: Textbook[];
  goods: Good[];
}

interface Textbook {
  id: number;
  discription: string;
  schoolCode: string;
  sellerId: number;
  textbookImg: string;
  textbookName: string;
  seller: User;
  goods: Good[];
}

interface Good {
  id: number;
  sellerId: number;
  seller: User;
  textbookId: number;
  textbook: Textbook;
}

function Goods(props: Props) {
  const { textbook } = props;
  const photoUrl: string | StaticImport = textbook.seller.photoUrl as string;
  const [ImageUrl, setImageUrl] = useState("");
  const id = process.browser ? location.pathname : "";
  const url = id.substring(14);
  const pathReference = ref(storage, `textbook/${url}/${textbook.textbookImg}`);
  getDownloadURL(pathReference).then((response) => {
    setImageUrl(response);
  });

  return (
    <div className="w-60 bg-gray-500 hover:opacity-80">
      <div className="bg-slate-200 flex">
        <div className="w-8 h-8">
          <Image src={photoUrl} width={50} height={50} alt="プロフィール写真" />
        </div>
        <p className="align-middle ml-4 truncate text-xl">
          {textbook.textbookName}
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
