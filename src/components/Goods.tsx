import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import Textbook from "@/lib/type";

interface Props {
  textbook: Textbook;
}

function Goods(props: Props) {
  const { textbook } = props;
  const photoUrl: string | StaticImport = textbook?.seller.photoUrl as string;
  const ImageUrl = textbook?.textbookImg as string;

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
