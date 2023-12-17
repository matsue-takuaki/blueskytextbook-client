import { useInfo } from "@/context/info";
import { apiClient, apiSchool } from "@/lib/apiClient";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function SelectSchool() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const {setUserId,setSchoolCode} = useInfo();
  const signout = () => {
    auth.signOut();
  };
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  const [schools, setSchools] = useState([]);
  const schoolref = useRef<HTMLInputElement>(null);
  const schoolSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await apiSchool
      .get(
        `https://api.edu-data.jp/api/v1/school?keyword=${schoolref.current?.value}`
      )
      .then(async (response) => {
        const selectSchools = response.data.schools.data;
        if (selectSchools.length == 0) {
          alert("学校名が間違っています");
        } else if (selectSchools.length > 1) {
          alert("学校が1つに絞れません");
        } else if (selectSchools.length == 1) {
          const photoUrl = user?.photoURL;
          const username = user?.displayName;
          const email = user?.email;
          const school = selectSchools[0].school_name;
          setSchoolCode(selectSchools[0].school_code);
          await apiClient.post("/auth/register", {
            username,
            photoUrl,
            email,
            school,
          }).then((responce)=>{
            setUserId(responce.data.user.id);
          });
          router.push(`transactions/${selectSchools[0].school_code}`);
        }
      });
  };
  const schoolChange = async (e: React.FormEvent<HTMLInputElement>) => {
    await apiSchool
      .get(
        `https://api.edu-data.jp/api/v1/school?keyword=${schoolref.current?.value}`
      )
      .then((response) => {
        setSchools(response.data.schools.data);
      });
  };
  return (
    <div className="h-screen bg-white">
      <div className="pt-24">
        <h1 className="text-center text-teal-300 text-5xl font-bold">
          青空教科書
        </h1>
      </div>
      <div className="text-center mt-32">
        <div className="mt-56">
          <div className="bg-gray-100 w-[20rem] h-40 mx-auto rounded-xl">
            <form action="" onSubmit={schoolSubmit} className="pt-8">
              <input
                className="block mx-auto py-2 rounded mb-6 outline-teal-300 transition-all duration-1000"
                size={30}
                type="text"
                onChange={schoolChange}
                name="university"
                id="university"
                list="school"
                ref={schoolref}
                placeholder="学校名を入力してください"
              />
              <datalist id="school">
                {schools.map((school: any) => (
                  <option
                    value={school.school_name}
                    key={school.school_code}
                  ></option>
                ))}
              </datalist>
              <input
                type="submit"
                value="送信"
                className="py-2 px-4 font-bold text-white bg-gray-900 rounded hover:shadow-lg hover:bg-gray-700 hover:-translate-y-1 hover:-translate-x-1 transition-all"
              />
            </form>
          </div>
          <button onClick={signout}>サインアウト</button>
        </div>
      </div>
    </div>
  );
}

export default SelectSchool;
