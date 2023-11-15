import React, { useEffect, useState } from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { useInfo } from "@/context/info";

function NavbarProfile() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {schoolCode} = useInfo();
  const SignOut = () => {
    auth.signOut();
  };
  //   useEffect(() => {
  //     if (!user) {
  //       router.push("/");
  //     }
  //   }, [user]);
  return (
    <div className="border bg-teal-950">
      <div className="w-5/6 mx-auto flex justify-between items-center pt-4 pb-6">
        <Link href={`/transactions/${schoolCode}`}>
          <h1 className="text-teal-300 text-4xl font-bold block">青空教科書</h1>
        </Link>
        <button
          onClick={SignOut}
          className="w-36 h-12 rounded-xl bg-black text-white shadow-xl hover:bg-gray-900 transition-all border-r-2 border-b"
        >
          <p className="text-bold">ログアウト</p>
        </button>
      </div>
    </div>
  );
}

export default NavbarProfile;
