import React from "react";
import { auth } from "@/lib/firebase";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";


function Navber(school: any) {
  const currentUniversity = school.school.school_name;
  const photoUrl:string | StaticImport = auth.currentUser?.photoURL as string;
  return (
    <div className="w-5/6 mx-autofflex">
      <h1 className="py-8 text-teal-300 text-5xl font-bold block">
        青空教科書　ー {currentUniversity} ー
      </h1>
      {/* <Image src={photoUrl} width={500} height={500} alt="教科書の写真"/> */}
      <img src={photoUrl} alt="プロフィール写真" className="block" />
    </div>
  );
}

export default Navber;
