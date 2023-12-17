import React from "react";

interface Props {
  message: string;
  confirm: boolean;
  createdAt: Date;
}

function MyMessage(props: Props) {
  const { message, createdAt, confirm } = props;
  const day = new Date(createdAt);
  const month = day.getMonth() + 1;
  const postingDate = `${day.getFullYear()}/${month}/${day.getDate()} ${day.getHours()}:${day.getMinutes()}`;
  return (
    <div className="flex items-end py-2">
      <div className="mr-2 ml-auto flex flex-col items-end text-sm">
        <p className="text-white">{!confirm || "既読"}</p>
        <p className="text-white">{postingDate}</p>
      </div>
      <div className="bg-[#06c755] rounded-l-xl rounded-br-xl w-64 mr-3">
        <p className="py-2 px-3 break-all">{message}</p>
      </div>
    </div>
  );
}

export default MyMessage;
