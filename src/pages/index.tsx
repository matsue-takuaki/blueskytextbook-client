import SignIn from "@/components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import SelectUniversity from "@/components/SelectUniversity";

export default function Home() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const signout = () => {
    auth.signOut();
  };
  return (
    <div className="h-screen bg-white">
      <div className="pt-24">
        <h1 className="text-center text-teal-300 text-5xl font-bold">
          青空教科書
        </h1>
      </div>
      <div className="text-center mt-32">
        {user ? (
          <div>
            <SelectUniversity />
          </div>
        ) : (
          <div className="mt-56">
            <SignIn />
          </div>
        )}
        <button onClick={signout}>サインアウト</button>
      </div>
    </div>
  );
}
