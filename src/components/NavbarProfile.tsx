import React,{useEffect} from "react";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

function NavbarProfile() {
  const [user] = useAuthState(auth);
  const router = useRouter();
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
        <h1 className="text-teal-300 text-4xl font-bold block">青空教科書</h1>
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
