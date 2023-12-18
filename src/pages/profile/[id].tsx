import NavbarProfile from "@/components/Navbars/NavbarProfile";
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
import SelectedGood from "@/components/SelectedGoods";
import MyGood from "@/components/MyGoods";
import ProfileHeart from "@/components/ProfileHeart";
import EmailIcon from '@mui/icons-material/Email';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  const userId = Number(context.query.userId);

  // 自分が出品した商品取得
  const firstMyTextbook = await apiClient.post("/product/get_mytextbooks", {
    userId,
  });

  // いいねした商品取得
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
  const [Heartdisplay, setHeartDisplay] = useState<string>("hidden");
  const [Mydisplay, setMyDisplay] = useState<string>("hidden");
  const [z_index, setZ_index] = useState<string>("-z-10");
  const [selectedTextbook, setSelectedTextbook] = useState<
    Textbook | undefined
  >(undefined);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  useEffect(() => {
    // if(auth.currentUser?.uid != useLocation().pathname){
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

  // 出品した商品を削除
  const handleDelete = async (id: number) => {
    const result = confirm("本当に削除しますか?");
    if (result) {
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
    }
  };

  // いいねを外す
  const handleHeartDelete = async (id: number) => {
    try {
      await apiClient
        .post("/good/delete_favorite", {
          sellerId: userId,
          textbookId: id,
        })
        .then(() => {
          const newfavoriteTextbooks = favoriteTextbooks.filter(
            (favoriteTextbook) => favoriteTextbook.id != id
          );
          setFavoriteTextbooks(newfavoriteTextbooks);
        });
    } catch (err) {
      console.log(err);
      alert("削除がうまく実行できませんでした");
    }
  };

  // 選択解除
  const handleDisplay = () => {
    setHeartDisplay("hidden");
    setMyDisplay("hidden");
    setZ_index("-z-10");
    setSelectedTextbook(undefined);
  };

  // いいねした商品の詳細表示する
  const selectGoodTextbook = (textbook: Textbook) => {
    setSelectedTextbook(textbook);
    setHeartDisplay("");
    setZ_index("z-10");
  };

  // 自分が出品した商品の詳細を表示する
  const selectMyTextbook = (textbook: Textbook) => {
    setSelectedTextbook(textbook);
    setMyDisplay("");
    setZ_index("z-10");
  };

  // 自分が出品した商品はいいねした商品の切り替え
  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  // メッセージルームへ移動
  const messageRouter = () => {
    router.push({
      pathname: `/messages/${auth.currentUser?.uid}`,
      query: {
        userId,
      },
    })
  }
  return (
    <div className="min-h-screen bg-white">
      <NavbarProfile />
      <div className="w-3/4 mx-auto">
        <ProfileData school={school} />
        <main className="">
          <div className="flex items-center">
            {/* 自分の商品といいねした商品のtoggleボタン */}
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

            {/* メッセージルーム移動ボタン */}
            <div onClick={messageRouter} className="ml-10 bg-black rounded-full py-2 px-2 hover:opacity-80">
            <EmailIcon sx={{fontSize:30, color:"white"}}/>
            </div>
          </div>
          {alignment == "left" ? (
            <div className="mx-auto mt-8 grid grid-cols-3 gap-x-4 gap-y-4">
              {/* 自分の商品を陳列 */}
              {myTextbooks.map((myTextbook: Textbook) => {
                return (
                  <div
                    className="relative"
                    onClick={() => {
                      selectMyTextbook(myTextbook);
                    }}
                    key={myTextbook.id}
                  >
                    <Goods textbook={myTextbook} key={myTextbook.id} />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
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
              {/* いいねした商品を陳列 */}
              {favoriteTextbooks.map((myTextbook: Textbook) => {
                return (
                  <div
                    className="relative"
                    onClick={() => {
                      selectGoodTextbook(myTextbook);
                    }}
                    key={myTextbook.id}
                  >
                    <Goods textbook={myTextbook} key={myTextbook.id} />
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHeartDelete(myTextbook.id);
                      }}
                      className="absolute bottom-0"
                    >
                      <ProfileHeart />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </main>
      </div>
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 ${Heartdisplay} z-20`}
      >
        <SelectedGood textbook={selectedTextbook} boolean={false} />
      </div>
      <div
        className={`fixed bottom-20 left-1/2 -translate-x-1/2 ${Mydisplay} z-20`}
      >
        <MyGood textbook={selectedTextbook} />
      </div>
      <div
        onClick={handleDisplay}
        className={`bg-black w-screen h-screen fixed top-0 left-0 ${z_index} opacity-70`}
      ></div>
    </div>
  );
}

export default Profile;
