import React from "react";
import { auth } from "@/lib/firebase";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Link from "next/link";
import Image from "next/image";
import { useInfo } from "@/context/info";

function Navber(school: any) {
  const { userId } = useInfo();
  const currentUniversity = school.school.school_name;
  const photoUrl: string | StaticImport = auth.currentUser?.photoURL as string;
  return (
    <div className="border bg-teal-950">
      <div className="w-5/6 mx-auto flex justify-between items-center pt-4 pb-6">
        <Link href={`/transactions/${school.school.school_code}`}>
          <h1 className="text-teal-300 text-4xl font-bold block">
            青空教科書 ー {currentUniversity} ー
          </h1>
        </Link>
        <div>
          <Link href={{ pathname: `/profile/[id]`,query:{userId:userId}}} as={`/profile/${auth.currentUser?.uid}`}>
            <div className="bg-white rounded-full">
              <Image
                src={photoUrl}
                alt="プロフィール写真"
                width={100}
                height={100}
                className="block border-double border-4 border-black rounded-full hover:opacity-80"
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Navber;
