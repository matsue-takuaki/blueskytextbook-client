import SignIn from "@/components/SignIn";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const [user] = useAuthState(auth);
  const [university, setUniversity] = useState<string>("九州工業大学");
  // console.log(user);
  const router = useRouter();
  useEffect(()=>{
    if(user){
      // alert("大学を選択してください");
      // router.push(`/${university}`)
    }
  }, [user]);
  const signout = ()=>{
    auth.signOut()
  }
  return (
    <div className="h-screen bg-white">
      <div className="pt-24">
        <h1 className="text-center text-teal-300 text-5xl font-bold">
          青空教科書
        </h1>
      </div>
      <div className="text-center mt-48">
        <SignIn />
        <form
          action=""
          onSubmit={() => {
            setUniversity("hoge");
          }}
        >
          <label htmlFor="university">大学名</label>
          <input type="text" name="university" id="university" />
          <input type="submit" value="決定" />
        </form>
        <button onClick={signout}>サインアウト</button>
        {user ? (
          <div>
            <p>{auth.currentUser?.displayName}</p>
            <p>{auth.currentUser?.email}</p>
          </div>
        ) : (
          <h1>fdfd</h1>
        )}
      </div>
    </div>
  );
}
