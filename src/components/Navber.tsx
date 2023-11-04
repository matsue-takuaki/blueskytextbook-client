import { auth } from "@/lib/firebase";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

function Navber() {
  const currentUniversity = "九州工業大学";
  const [user] = useAuthState(auth);
//   const router = useRouter();
//   useEffect(() => {
//     if (!user) {
//       alert("ログインしてださい");
//       router.push("/");
//     }
//   }, [user]);
  return (
    <div className="w-5/6 mx-auto">
      <h1 className="py-8 text-teal-300 text-5xl font-bold">
        青空教科書　ー{currentUniversity}ー
      </h1>
    </div>
  );
}

export default Navber;
