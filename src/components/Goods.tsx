import { useInfo } from "@/context/info";
import { auth, storage } from "@/lib/firebase";
import { textbook } from "@/pages/types/type";
import { getDownloadURL, ref } from "firebase/storage";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import React,{useState} from "react";

interface Props {
  textbook: textbook;
}

function Goods(props: Props) {
  const { textbook } = props;
  const [ImageUrl,setImageUrl] = useState("");
  const id = process.browser ? location.pathname : "";
  const url = id.substring(14);
  // console.log(url)
  const pathReference = ref(
    storage,
    `textbook/${url}/${textbook.textbookImg}`
  );
  getDownloadURL(pathReference).then((response) => {
    setImageUrl(response);
  });
  const productUrl: string | StaticImport = auth.currentUser
    ?.photoURL as string;
  return (
    <button>
      <div className="w-60">
        <div className="bg-slate-200 flex">
          <div className="w-8 h-8">
            <img
              src="https://pics.prcm.jp/85c14649984c2/84932439/jpeg/84932439_480x480.jpeg"
              alt="プロフィール写真"
            />
          </div>
          <p className="align-middle ml-4 truncate text-xl">{textbook.textbookName}</p>
        </div>
        <div className="h-80 relative">
          <Image
            src={ImageUrl}
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
