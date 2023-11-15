import NavbarProfile from "@/components/NavbarProfile";
import ProfileData from "@/components/Profile";
import { auth } from "@/lib/firebase";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { apiClient, apiSchool } from "@/lib/apiClient";
import { useInfo } from "@/context/info";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};

function Profile({ id }: any) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [school, setSchool] = useState<string>("");
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);
  useEffect(() => {
    // if(auth.currentUser?.uid != id){
      //     alert("あなたはこのページに閲覧することはできません");
      //     router.push("/");
      //   }
    const getProfile = async () => {
      const email = auth.currentUser?.email;
      const user = await apiClient.post("/auth/get", {
        email,
      });
      setSchool(user.data.user.school);
    };
    getProfile();
  }, []);
  return (
    <div className="h-screen bg-white">
      <NavbarProfile/>
      <div className="w-3/4 mx-auto mt-4">
        <ProfileData school={school}/>
      </div>
    </div>
  );
}

export default Profile;
