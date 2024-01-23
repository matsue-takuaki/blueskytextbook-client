import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

interface Props {
  photo: string;
  message: string;
  confirm: boolean;
  createdAt: Date;
}

function Opponent(props: Props) {
  const { photo, message, createdAt } = props;
  const photoUrl: string | StaticImport = photo as string;
  const day = new Date(createdAt);
  const month = day.getMonth() + 1;
  let hour =
    day.getHours() < 10 ? "0" + String(day.getHours()) : day.getHours();
  let minutes =
    day.getMinutes() < 10 ? "0" + String(day.getMinutes()) : day.getMinutes();
  const postingDate = `${day.getFullYear()}/${month}/${day.getDate()} ${hour}:${minutes}`;
  return (
    <div className="flex items-end">
      <div className="flex pt-3">
        <div className="w-10 h-10 ml-2 mr-2">
          <Image
            src={photoUrl}
            width={100}
            height={100}
            alt="プロフィール写真"
            className="block border rounded-full hover:opacity-80"
          />
        </div>
        <div className="bg-white rounded-r-xl rounded-bl-xl w-64">
          <p className="py-2 px-3 break-all">{message}</p>
        </div>
      </div>
      <div className="ml-2 text-sm">
        <p className="text-white">{postingDate}</p>
      </div>
    </div>
  );
}

export default Opponent;
