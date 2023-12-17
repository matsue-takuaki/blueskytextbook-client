import Messenger from "@/components/Messenger";
import NavbarMessage from "@/components/Navbars/NavbarMessage";
import React, { useEffect, useRef, useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Opponent from "@/components/Opponent";
import MyMessage from "@/components/MyMessage";
import { GetServerSideProps } from "next";
import { apiClient } from "@/lib/apiClient";
import NoMessanger from "@/components/NoMessanger";
import { useInfo } from "@/context/info";
import SelectRecommend from "@/components/SelectRecommend";
import NoMessage from "@/components/NoMessage";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sellerId = Number(context.query.sellerId);
  const buyerId = Number(context.query.buyerId);
  const textbookId = Number(context.query.textbookId);
  const userId = Number(context.query.userId);
  const oneMessages =
    sellerId && buyerId && textbookId
      ? await apiClient
          .post("/message/confirm_AllMessage", {
            sellerId,
            buyerId,
            textbookId,
            userId,
          })
          .then((responce) => {
            return responce.data.messages;
          })
      : null;
  const allMessages = await apiClient
    .post("/message/get_allMessages", {
      userId,
    })
    .then((responce) => {
      return responce.data.messages;
    });
  return {
    props: {
      oneMessages: oneMessages,
      allMessages,
    },
  };
};

function messageRoom(props: any) {
  const { oneMessages, allMessages } = props;
  const { userId } = useInfo();
  const [user] = useAuthState(auth);
  const router = useRouter();
  const overflowRef = useRef<HTMLDivElement>(null);
  const [selectedMessages, setSelectedMessages] = useState(oneMessages);
  const [nowMessages, setNowMessages] = useState(oneMessages?.message);
  const [Messages, setMessages] = useState(allMessages);
  const [inputText, setInputText] = useState("");
  const setScrollPosition = () => {
    overflowRef.current?.scrollTo(0, overflowRef.current?.offsetHeight);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText) {
      try {
        const newMessage = await apiClient
          .post("/message/create_message", {
            message: inputText,
            senderId: userId,
            messageId: selectedMessages.id,
          })
          .then((responce) => {
            return responce.data.messageText;
          });
        setNowMessages([...nowMessages, newMessage]);
        setInputText("");
        setTimeout(() => {
          setScrollPosition();
        }, 1);
      } catch (error) {
        alert("サーバーエラーです");
        console.log(error);
      }
    } else {
      alert("メッセージを入力してください");
    }
  };
  const selectMessage = async (messages: any) => {
    const latestMessages = await apiClient
      .post("/message/confirm_AllMessage", {
        sellerId: messages.sellerId,
        buyerId: messages.buyerId,
        textbookId: messages.textbookId,
        userId,
      })
      .then((responce) => {
        return responce.data.messages;
      });
    setSelectedMessages(messages);
    setNowMessages(latestMessages.message);
    setTimeout(() => {
      setScrollPosition();
    }, 1);
  };
  useEffect(() => {
    setScrollPosition();
  }, []);
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="bg-slate-200 h-screen">
      <NavbarMessage />
      <main className="flex w-5/6 mx-auto">
        <div className="h-96 w-1/4 bg-gray-900 overflow-y-auto">
          {Messages.length ? (
            Messages.map((Messages: any) => (
              <div
                key={Messages.messages.id}
                onClick={() => {
                  selectMessage(Messages.messages);
                }}
              >
                <Messenger
                  username={Messages.messages.connection[0].user.username}
                  photo={Messages.messages.connection[0].user.photoUrl}
                />
              </div>
            ))
          ) : (
            <div>
              <NoMessanger />
            </div>
          )}
        </div>
        <div className="w-3/4">
          <div className="h-96 bg-[#7494C0] overflow-y-auto" ref={overflowRef}>
            {nowMessages ? (
              nowMessages.length ? (
                nowMessages.map((message: any) => (
                  <div key={message.id}>
                    {message.senderId == userId ? (
                      <MyMessage
                        message={message.message}
                        confirm={message.confirm}
                        createdAt={message.createdAt}
                      />
                    ) : (
                      <Opponent
                        photo={message.sender?.photoUrl}
                        message={message.message}
                        confirm={message.confirm}
                        createdAt={message.createdAt}
                      />
                    )}
                  </div>
                ))
              ) : (
                <div>
                  <NoMessage />
                </div>
              )
            ) : (
              <div>
                <SelectRecommend />
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit}>
            <div className="h-10 bg-gray-300 flex">
              <input
                type="text"
                size={40}
                className="rounded-lg my-auto ml-4 focus:outline focus:outline-cyan-500 outline-2"
                value={inputText}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setInputText(e.target.value);
                }}
              />
              <button>
                <div className="my-auto ml-5">
                  <SendIcon />
                </div>
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default messageRoom;
