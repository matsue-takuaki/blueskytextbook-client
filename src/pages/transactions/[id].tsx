import Goods from "@/components/Goods";
import Navber from "@/components/Navber";
import { auth } from "@/lib/firebase";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { apiClient, apiSchool } from "@/lib/apiClient";
import ExhibitionButton from "@/components/ExhibitionButton";
import {useState} from "react"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const schoolResponse = await apiSchool.get(
    `https://api.edu-data.jp/api/v1/school?keyword=${id}`
  );
  return {
    props: {
      school: schoolResponse.data.schools.data[0],
    },
  };
};

function School({ school }: any) {
  const [user] = useAuthState(auth);
  const router = useRouter();
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);
  return (
    <div className="bg-white">
      <Navber school={school} />
      <main className="w-3/4 mx-auto mt-8 grid grid-cols-3 gap-x-4 gap-y-4">
        <Goods discription="たくあきの画像" />
        <Goods discription="たくあきの画像" />
        <Goods discription="たくあきの画像" />
        <Goods discription="たくあきの画像" />
        <Goods discription="たくあきの画像" />
      </main>
      <div className="fixed right-10 bottom-6">
        <ExhibitionButton />
      </div>
    </div>
  );
}

export default School;
