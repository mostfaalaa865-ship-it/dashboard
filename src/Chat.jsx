import { useParams } from "react-router-dom";
import useGetMessages from "./hooks/Messages/useGetMessages";

import arrow from "./assets/arrow.svg";
import email from "./assets/email.svg";
import { useEffect, useState } from "react";
import useSendMessage from "./hooks/Messages/useSendMessage";
import useReadasMark from "./hooks/Messages/useReadasMark";

function Chat() {
  const { id } = useParams();
  const [messageText, setMessageText] = useState("");
  const sendMessage = useSendMessage();
  const { ReadMessages } = useReadasMark();
  const { getMessages, setGetMessages } = useGetMessages(id);
  console.log(setGetMessages);

  useEffect(() => {
    ReadMessages(id);
  }, [id]);

  function handlesendMessage() {
    sendMessage(messageText, id);
    setMessageText("");
    setGetMessages((prev) => [
      ...prev,
      {
        id: null,
        conversation_id: id,
        sender: "user",
        body: messageText,
        read_at: null,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }

  const isNewDay = (current, previous) => {
    if (!previous) return true;
    const currDate = new Date(current.created_at).toDateString();
    const prevDate = new Date(previous.created_at).toDateString();
    return currDate !== prevDate;
  };

  const formatDay = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", { month: "long", day: "numeric" });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="p-3">
      <div className="p-3 mb-4 w-[700px] max-h-[500px] overflow-auto">
        {getMessages.length === 0 && (
          <p className="text-center text-purple-900">لا يوجد رسائل</p>
        )}

        {getMessages.map((mes, index) => {
          const showDate = isNewDay(mes, getMessages[index - 1]);
          return (
            <div key={mes.id}>
              {showDate && (
                <div className="text-center my-3">
                  <span className="text-xs bg-gray-200 px-3 py-1 rounded-full text-gray-600">
                    {formatDay(mes.created_at)}
                  </span>
                </div>
              )}

              <div
                className={`p-3 m-4 rounded-3xl max-w-[70%] ${
                  mes.sender === "user"
                    ? "ml-auto text-right bg-[#F3F4F6]"
                    : "mr-auto text-left bg-[#E6F2FE]"
                }`}
              >
                <p>{mes.body}</p>
                <div className="flex justify-end items-center gap-1 mt-1">
                  <span className="text-[10px] text-gray-400">
                    {formatTime(mes.created_at)}
                  </span>
                  <span className="text-[10px]">
                    {mes.read_at ? "✔✔" : "✔"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="w-175 p-3 border-2 border-[#E2E4E9] h-31.25 rounded-2xl">
        <div>
          <div className="flex items-center">
            <img className="w-4 h-4" src={email} alt="" />
            <p className="m-1 text-[#4A4D59]">Email</p>
            <img className="w-4 h-4" src={arrow} alt="" />
          </div>
          <input
            value={messageText}
            className="text-[#8F929C] w-full border-none outline-none"
            placeholder="Use ⌘K for shortcuts"
            onChange={(e) => setMessageText(e.target.value)}
          />
        </div>
        <div className="flex justify-end items-center mt-2">
          <button onClick={handlesendMessage} className="cursor-pointer">
            Send
          </button>
          <img className="w-4 h-4" src={arrow} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Chat;
