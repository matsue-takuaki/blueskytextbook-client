import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

interface Props {
  username:String,
  photo:String
}

function Messenger(props:Props) {
  const {username,photo} = props;
  const photoUrl: string | StaticImport = photo as string;
  const userName = username;
  return (
    <div className="h-24 bg-gray-900 flex border hover:opacity-80">
      <div className="w-20 h-20 my-auto ml-3">
        <Image
          src={photoUrl}
          width={100}
          height={100}
          alt="プロフィール写真"
          className="block border rounded-full"
        />
      </div>
      <p className="text-xl text-white ml-5 my-auto">{userName}</p>
    </div>
  );
}

export default Messenger;
