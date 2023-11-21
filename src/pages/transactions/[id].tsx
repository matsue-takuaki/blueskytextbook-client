import Goods from "@/components/Goods";
import Navber from "@/components/Navber";
import { auth } from "@/lib/firebase";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { apiClient, apiSchool } from "@/lib/apiClient";
import ExhibitionButton from "@/components/ExhibitionButton";
import { useInfo } from "@/context/info";
import { text } from "stream/consumers";
import SelectedGood from "@/components/SelectedGoods";

interface User {
  id: number;
  username: String;
  email: String;
  photoUrl: String;
  school: String;
  textbooks: Textbook[];
  goods: Good[];
}

interface Textbook {
  id: number;
  discription: string;
  schoolCode: string;
  sellerId: number;
  textbookImg: string;
  textbookName: string;
  seller: User;
  goods: Good[];
}

interface Good {
  id: number;
  sellerId: number;
  seller: User;
  textbookId: number;
  textbook: Textbook;
}

interface Props {
  school: any;
  textbooks: Textbook[];
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

function School(props: Props) {
  const { school, textbooks } = props;
  const [user] = useAuthState(auth);
  const router = useRouter();
  const { userId } = useInfo();
  const selectedTextbooks = textbooks.filter(
    (textbook) => textbook.sellerId != userId
  );
  const [selectedTextbook, setSelectedTextbook] = useState<Textbook | undefined>(
    undefined
  );
  const [display, setDisplay] = useState<string>("hidden");
  const [z_index, setZ_index] = useState<string>("-z-10");
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);
  const selectTextbook = (textbook: Textbook) => {
    setSelectedTextbook(textbook);
    setDisplay("");
    setZ_index("z-10");
  };
  const handleDisplay = () => {
    setDisplay("hidden");
    setZ_index("-z-10");
    setSelectedTextbook(undefined);
  };
  return (
    <div>
      <div className="bg-white min-h-screen">
        <Navber school={school} />
        <main className="w-3/4 mx-auto mt-8 grid grid-cols-3 gap-x-4 gap-y-4">
          {selectedTextbooks.map((textbook: Textbook) => (
            <button
              onClick={() => {
                selectTextbook(textbook);
              }}
              key={textbook.id}
            >
              <Goods textbook={textbook} key={textbook.id} />
            </button>
          ))}
        </main>
        <div className="fixed right-10 bottom-6">
          <ExhibitionButton />
        </div>
        <div className={`fixed bottom-20 left-1/2 -translate-x-1/2 ${display} z-20`}>
          <SelectedGood textbook={selectedTextbook}/>
        </div>
      </div>
      <button onClick={handleDisplay}>
        <div
          className={`bg-black w-screen h-screen fixed top-0 left-0 ${z_index} opacity-70`}
        ></div>
      </button>
    </div>
  );
}

export default School;
