import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "@/lib/firebase";
import { apiClient, apiSchool } from "@/lib/apiClient";
import { useRouter } from "next/router";
import { useInfo } from "@/context/info";

function SignIn() {
  const router = useRouter();
  const {setUserId,setSchoolCode} = useInfo()

  // googleでログインした後にtopページへ遷移
  const SignInwithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const email = result.user.email;
      const user = await apiClient.post("/auth/get", {
        email,
      });
      //初回ログインの場合学校選択ページへ
      // それ以外はデータを取得してtopページ遷移
      if (!user.data.user) {
        router.push("/SelectSchool");
      } else {
        const school = user.data.user.school;
        setUserId(user.data.user.id);
        await apiSchool
          .get(`https://api.edu-data.jp/api/v1/school?keyword=${school}`)
          .then((response) => {
            const schoolCode = response.data.schools.data[0].school_code;
            setSchoolCode(schoolCode);
            router.push(`/transactions/${schoolCode}`);
          });
      }
    });
  };
  return (
    <div>
      <button
        onClick={SignInwithGoogle}
        className="w-36 h-12 rounded-xl bg-gray-900 text-white shadow-xl hover:bg-gray-800 hover:-translate-y-1 hover:-translate-x-1 transition-all"
      >
        <p className="text-bold">Googleでログイン</p>
      </button>
    </div>
  );
}

export default SignIn;
