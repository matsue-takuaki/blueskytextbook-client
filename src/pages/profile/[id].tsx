import NavbarProfile from "@/components/NavbarProfile";
import ProfileData from "@/components/Profile";
import { auth } from "@/lib/firebase";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { apiClient } from "@/lib/apiClient";
import { useInfo } from "@/context/info";
import Goods from "@/components/Goods";
import DeleteButton from "@/components/Delete";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Textbook from "../../lib/type";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const userId = Number(context.query.userId);
  const firstMyTextbook = await apiClient.post("/product/get_mytextbooks", {
    userId,
  });
  let favoriteTextbooks: Textbook[] = [];
  await apiClient
    .post("/good/get_favoriteTextbook", {
      userId,
    })
    .then((response) => {
      response.data.favorite.map((good: any) => {
        favoriteTextbooks.push(good.textbook);
      });
    });
  return {
    props: {
      id,
      firstMyTextbook: firstMyTextbook.data,
      favoriteTextbook: favoriteTextbooks,
    },
  };
};

function Profile(props: any) {
  const { firstMyTextbook, favoriteTextbook } = props;
  const router = useRouter();
  const { userId } = useInfo();
  const [user] = useAuthState(auth);
  const [school, setSchool] = useState<string>("");
  const [myTextbooks, setMyTextbooks] = useState<Textbook[]>(firstMyTextbook);
  const [favoriteTextbooks, setFavoriteTextbooks] =
    useState<Textbook[]>(favoriteTextbook);
  const [alignment, setAlignment] = useState<string | null>("left");

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

  const handleDelete = async (id: number) => {
    try {
      await apiClient
        .post("/product/delete_textbook", {
          id,
        })
        .then(() => {
          const newMyTextbooks = myTextbooks.filter(
            (myTextbook) => myTextbook.id != id
          );
          setMyTextbooks(newMyTextbooks);
        });
    } catch (err) {
      console.log(err);
      alert("削除がうまく実行できませんでした");
    }
  };

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };
  return (
    <div className="min-h-screen bg-white">
      <NavbarProfile />
      <div className="w-3/4 mx-auto">
        <ProfileData school={school} />
        <main className="">
          <div className="flex items-center">
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                <p>自分の商品</p>
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                <p>いいねした商品</p>
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {alignment == "left" ? (
            <div className="mx-auto mt-8 grid grid-cols-3 gap-x-4 gap-y-4">
              {myTextbooks.map((myTextbook: Textbook) => {
                return (
                  <div className="relative" key={myTextbook.id}>
                    <Goods textbook={myTextbook} key={myTextbook.id} />
                    <div
                      onClick={() => {
                        handleDelete(myTextbook.id);
                      }}
                      className="absolute bottom-0"
                    >
                      <DeleteButton />
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="mx-auto mt-8 grid grid-cols-3 gap-x-4 gap-y-4">
              {favoriteTextbooks.map((myTextbook: Textbook) => {
                return (
                  <div className="relative" key={myTextbook.id}>
                    <Goods textbook={myTextbook} key={myTextbook.id} />
                    <div
                      onClick={() => {
                        handleDelete(myTextbook.id);
                      }}
                      className="absolute bottom-0"
                    ></div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Profile;
