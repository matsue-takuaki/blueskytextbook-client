import React from "react";

function ToggoleButton(props: any) {
  const { toggleName } = props;
  return (
    <div className="">
      <button className="w-24 h-12 rounded-xl bg-gray-900 text-white shadow-xl hover:bg-gray-700 transition-all">
        <p className="text-bold text-xl">{toggleName}</p>
      </button>
    </div>
  );
}

export default ToggoleButton;
