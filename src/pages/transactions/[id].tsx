import Goods from "@/components/Goods";
import Navber from "@/components/Navber";
import { auth } from "@/lib/firebase";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { apiClient, apiSchool } from "@/lib/apiClient";
import ExhibitionButton from "@/components/ExhibitionButton";

interface User {
  id: number;
  email: String;
  school: String;
  textbooks: Textbook[]
  goods: Good[]
}

interface Textbook {
  id: number;
  discription: string;
  schoolCode: string;
  sellerId: number;
  textbookImg: string;
  textbookName: string;
  goods:Good[]
}

interface Good {
  id: number;
  sellerId: number;
  seller: User;
  textbookId: number;
  textbook: Textbook
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const schoolResponse = await apiSchool.get(
    `https://api.edu-data.jp/api/v1/school?keyword=${id}`
  );
  const textbooks = await apiClient.get("/product/get_textbooks", {
    data: {
      schoolCode: id,
    },
  });
  return {
    props: {
      school: schoolResponse.data.schools.data[0],
      textbooks: textbooks.data,
    },
  };
};

function School({ school, textbooks }: any) {
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
        {textbooks.map((textbook: Textbook) => (
          <Goods textbook={textbook} key={textbook.id} />
        ))}
      </main>
      <div className="fixed right-10 bottom-6">
        <ExhibitionButton />
      </div>
    </div>
  );
}

export default School;
