import { auth } from "@/lib/firebase";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React from "react";

function ProfileData(school:any) {
  const photoUrl: string | StaticImport = auth.currentUser?.photoURL as string;
  return (
    <div>
      <div className="flex items-center justify-evenly">
        <img src={photoUrl} className="rounded-full " alt="プロフィール写真" />
        <p className="text-3xl">
          名前： {auth.currentUser?.displayName}
        </p>
        <p className="text-3xl">学校： {school.school}</p>
      </div>
    </div>
  );
}

export default ProfileData;
