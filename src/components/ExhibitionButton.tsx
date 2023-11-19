import { useRouter } from "next/router";
import React from "react";

function ExhibitionButton() {
  const router = useRouter()
  const handleSubmit = () => {
    router.push("/Exhibition");
  }
  return (
    <div className="w-40 mx-auto mt-16">
      <button onClick={handleSubmit} className="w-32 h-16 rounded-xl bg-gray-900 text-white shadow-xl hover:bg-gray-800 hover:-translate-y-1 hover:-translate-x-1 transition-all">
        <p className="text-bold text-xl">出品</p>
      </button>
    </div>
  );
}

export default ExhibitionButton;
