import { useParams } from "react-router-dom";
import useGetMessages from "./hooks/Messages/useGetMessages";
import arrow from "./assets/arrow.svg";
import email from "./assets/email.svg";
import { useEffect, useRef, useState } from "react";
import useSendMessage from "./hooks/Messages/useSendMessage";
import useReadasMark from "./hooks/Messages/useReadasMark";
import { Axios } from "./Api/Axios";

function Chat() {
  const [page, setpage] = useState(1);
  const { id } = useParams();
  const [messageText, setMessageText] = useState("");
  const sendMessage = useSendMessage();
  const { ReadMessages } = useReadasMark();
  const { getMessages, setGetMessages, loading } = useGetMessages(id, page);
  const chatRef = useRef();
  const isPageination = useRef(false);
  const prevHeight = useRef(0);

  useEffect(() => {
    ReadMessages(id);
  }, [id]);

  useEffect(() => {
    if (!id) return;
    const ws = new WebSocket("wss://mostafa.nageeb-darwish.cloud/app/469630");

    const channel_name = `private-conversation.${id}`;
    ws.onopen = () => {
      console.log("connected");
    };

    ws.onmessage = async (event) => {
      console.log(event.data);

      try {
        const parsed = JSON.parse(event.data);
        if (parsed.event == "pusher:connection_established") {
          const data = JSON.parse(parsed.data);
          const socket_id = data.socket_id;

          const AuthRes = await Axios.post(`/broadcasting/auth`, {
            socket_id,
            channel_name,
          });
          const auth = AuthRes.data.auth;

          ws.send(
            JSON.stringify({
              event: "pusher:subscribe",
              data: {
                channel: channel_name,
                auth,
              },
            }),
          );
        }
        if (parsed.event == "MessageSent") {
          console.log(parsed.data);
          const message = JSON.parse(parsed.data);
          setGetMessages((prev) => [...prev, message.message]);
          console.log(message.message);
        }
      } catch (error) {
        console.log(error);
      }
    };
    ws.onerror = (err) => {
      console.log(err);
    };
    ws.onclose = () => {
      console.log("connection closed");
    };
    return () => {
      ws.close();
    };
  }, [id]);

  useEffect(() => {
    if (getMessages.length < 1) return;

    if (!isPageination.current) {
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    } else {
      const newHeight = chatRef.current.scrollHeight;

      const diff = newHeight - prevHeight.current;

      chatRef.current.scrollTop = diff;
    }
  }, [getMessages]);

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;
    let isLoading = loading;
    const handlePagination = () => {
      if (chat.scrollTop <= 150 && !loading) {
        isPageination.current = true;
        prevHeight.current = chat.scrollHeight;

        setpage((prev) => prev + 1);
        console.log(isLoading);
      }
    };

    chat.addEventListener("scroll", handlePagination);

    return () => {
      chat.removeEventListener("scroll", handlePagination);
    };
  }, [loading]);

  function handlesendMessage() {
    if (!messageText.trim()) return;

    sendMessage(messageText, id);
    setMessageText("");
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
      <div
        className="p-3 mb-4 w-[700px] max-h-[500px] overflow-auto"
        ref={chatRef}
      >
        {getMessages.length === 0 && (
          <p className="text-center text-purple-900">لا يوجد رسائل</p>
        )}

        {getMessages.map((mes, index) => {
          const showDate = isNewDay(mes, getMessages[index - 1]);
          return (
            <div key={`${mes.id}-${index}`}>
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
