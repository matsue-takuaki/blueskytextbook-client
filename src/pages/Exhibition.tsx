import NavbarExhibition from "@/components/NavbarExhibition";
import { apiClient } from "@/lib/apiClient";
import { auth, storage } from "@/lib/firebase";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageLogo from "../Images/image.svg";
import Image from "next/image";
import { useInfo } from "@/context/info";
import { deleteObject, ref, uploadBytes } from "firebase/storage";

function Exhibition() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const { userId, schoolCode } = useInfo();
  const [textbookImgUrl, setTextbookImgUrl] = useState(ImageLogo);
  const [preTextbookImgName, setPreTextbookImgName] = useState("");
  const [isImageUploaded, setisImageUploaded] = useState<boolean>(false);
  const textbooknameRef = useRef<HTMLInputElement>(null);
  const textbookdiscriptionRef = useRef<HTMLTextAreaElement>(null);
  const textbookImgref = useRef<HTMLInputElement>(null);
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);
  const onFileInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setTextbookImgUrl(window.URL.createObjectURL(fileObject));
    setPreTextbookImgName(fileObject.name);
    const textbookImageRef = ref(
      storage,
      `textbook/${schoolCode}/${fileObject.name}`
    );
    uploadBytes(textbookImageRef, fileObject).then((snapshot) => {
      if (isImageUploaded) {
        // Create a reference to the file to delete
        const desertRef = ref(
          storage,
          `textbook/${schoolCode}/${preTextbookImgName}`
        );
        // Delete the file
        deleteObject(desertRef).catch((error) => {
          // Uh-oh, an error occurred!
          console.log(error);
        });
      }
    });
    setisImageUploaded(true);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const textbookName = textbooknameRef.current?.value;
    const discription = textbookdiscriptionRef.current?.value;
    const textbookImgString = textbookImgref.current?.value;
    const textbookImg = textbookImgString?.substr(12);
    const sellerId = userId;
    try {
      await apiClient.post("/product/exhibition", {
        textbookName,
        discription,
        textbookImg,
        schoolCode,
        sellerId,
      });
      alert("出品が完了しました");
      router.push(`transactions/${schoolCode}`);
    } catch (err) {
      alert("入力内容が正しくありません");
      console.log(err);
    }
  };
  return (
    <div className="h-screen bg-white w-full">
      <NavbarExhibition />
      <p className="text-2xl text-center mt-10">先に画像を選択してください</p>
      <div className="mx-auto w-1/2 mt-10">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex">
            <div className="w-60 h-60">
              <Image
                src={textbookImgUrl}
                width={200}
                height={400}
                alt="教科書画像"
                style={{
                  objectFit: "cover",
                }}
              />
              <input
                type="file"
                accept=".png,.jpeg,.jpg"
                className=""
                ref={textbookImgref}
                onChange={onFileInputChange}
              />
            </div>
            <div className="flex flex-col">
              <div className="block">
                <label htmlFor="textbookname">教科書名：</label>
                <input
                  type="text"
                  id="textbookname"
                  className="rounded outline outline-1 outline-slate-600"
                  placeholder="教科書名をご記入ください"
                  ref={textbooknameRef}
                />
              </div>
              <div className="block mt-8">
                <label htmlFor="textbookdiscription">説明：</label>
                <textarea
                  className="rounded outline outline-1 outline-slate-600 align-top"
                  id="textbookdiscription"
                  cols={30}
                  rows={3}
                  placeholder="説明をご記入ください"
                  ref={textbookdiscriptionRef}
                ></textarea>
              </div>
              <div className="w-40 mx-auto mt-16">
                <button className="w-36 h-12 rounded-xl bg-gray-900 text-white shadow-xl hover:bg-gray-800 hover:-translate-y-1 hover:-translate-x-1 transition-all">
                  <p className="text-bold">出品</p>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Exhibition;
