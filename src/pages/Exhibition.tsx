import NavbarExhibition from "@/components/NavbarExhibition";
import Navber from "@/components/Navber";
import { apiClient, apiSchool } from "@/lib/apiClient";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import ImageLogo from "../../test/image.svg";
import Image from "next/image";

function Exhibition() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [textbookImg, setTextbookImg] = useState(ImageLogo);
  const textbooknameRef = useRef<HTMLInputElement>(null);
  const textbookdiscriptionRef = useRef<HTMLTextAreaElement>(null);
  // useEffect(() => {
  //   if (!user) {
  //     router.push("/");
  //   }
  // }, [user]);
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    // React.ChangeEvent<HTMLInputElement>よりファイルを取得
    const fileObject = e.target.files[0];
    // オブジェクトURLを生成し、useState()を更新
    setTextbookImg(window.URL.createObjectURL(fileObject));
  };
  return (
    <div className="h-screen bg-white w-full">
      <NavbarExhibition />
      <div className="mx-auto w-1/2 mt-20">
        <form action="">
          <div className="flex">
            <div className="w-60 h-60">
              <Image
                src={textbookImg}
                width={200}
                height={400}
                alt="教科書画像"
                style={{
                  objectFit: "cover",
                }}
              />
              <input type="file" className="" onChange={onFileInputChange} />
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
