import { signInWithPopup } from "firebase/auth";
import React from "react";
import { auth, provider } from "@/lib/firebase";
import { apiClient, apiSchool } from "@/lib/apiClient";
import { useRouter } from "next/router";

function SignIn() {
  const router = useRouter();
  const SignInwithGoogle = () => {
    signInWithPopup(auth, provider).then(async (result) => {
      const email = result.user.email;
      const user = await apiClient.post("/auth/get", {
        email,
      });
      if (!user.data.user) {
        router.push("/SelectSchool");
      } else {
        const school = user.data.user.school;
        await apiSchool
          .get(`https://api.edu-data.jp/api/v1/school?keyword=${school}`)
          .then((response) => {
            const schoolCode = response.data.schools.data[0].school_code;
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
