import { auth } from "@/lib/firebase";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React from "react";

function Goods({ discription }: any) {
  const photoUrl: string | StaticImport = auth.currentUser?.photoURL as string;
  return (
    <button>
      <div className="w-60">
        <div className="bg-slate-200 flex">
          <div className="w-8 h-8">
            <img
              src="https://pics.prcm.jp/85c14649984c2/84932439/jpeg/84932439_480x480.jpeg"
              alt="プロフィール写真"
              className="rounded-full"
            />
          </div>
          <p className="align-middle ml-4 truncate">{discription}</p>
        </div>
        <div className="h-80 relative">
          <Image
            src={photoUrl}
            alt="商品写真"
            fill
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </button>
  );
}

export default Goods;
