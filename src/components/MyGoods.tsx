import { StaticImageData } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";
import DefaultIcon from "@/Images/defaultIcon.png";
import DefaultTextbook from "@/Images/defaultTextbook.jpg";
import Textbook from "@/lib/type";

interface Props {
  textbook: Textbook | undefined;
}

function MyGood(props: Props) {
  const { textbook } = props;
  const photoUrl: string | StaticImageData = textbook
    ? (textbook.seller.photoUrl as string)
    : DefaultIcon;
  const username = textbook ? textbook.seller.username : "ユーザーネーム";
  const textbookName = textbook ? textbook.textbookName : "教科書名";
  const discription = textbook ? textbook.discription : "~~~~~~~~~~";
  const ImageUrl = textbook ? textbook.textbookImg as string : DefaultTextbook;
  return (
    <div>
      <div className="flex h-96 bg-gray-200">
        <div className="w-80">
          <div className="w-72 h-[370px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-500 relative">
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
        <div className="w-60 bg-white pt-6 pl-6">
          <div className="flex h-12 align-bottom">
            <div className="w-12">
              <Image
                src={photoUrl}
                width={50}
                height={50}
                alt="プロフィール画像"
                className="rounded-full"
              />
            </div>
            <p className="text-xl mt-2 ml-4">{username}</p>
          </div>
          <p className="text-xl mt-6 font-bold">{textbookName}</p>
          <div className="mt-4">
            <p className="text-xl">説明</p>
            <p className="text-xl font-bold">{discription}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyGood;
