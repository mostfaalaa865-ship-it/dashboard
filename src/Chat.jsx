import { useParams } from "react-router-dom";
import useGetMessages from "./hooks/Messages/useGetMessages";
import arrow from "./assets/arrow.svg";
import email from "./assets/email.svg";
import { useEffect, useRef, useState } from "react";
import useSendMessage from "./hooks/Messages/useSendMessage";
import useReadasMark from "./hooks/Messages/useReadasMark";
// import useUser from "./hooks/useUser";
import { Axios } from "./Api/Axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Document, Page } from "react-pdf";

function Chat() {
  const [page, setpage] = useState(1);
  const { id } = useParams();
  const [messageText, setMessageText] = useState("");
  const sendMessage = useSendMessage();
  const { ReadMessages } = useReadasMark();
  const { GetMessages, setGetMessages, loading } = useGetMessages(page, id);
  const chatRef = useRef();
  const isPageination = useRef(false);
  const prevHeight = useRef(0);
  const InputRef = useRef();
  const [image, setimage] = useState([]);
  const [show, setshow] = useState(false);
  const [urlImage, seturlImage] = useState();
  const [pdfUrl, setPdfUrl] = useState(null);

  useEffect(() => {
    ReadMessages(id);
  }, [id]);

  //   if (!user?.id) return;

  //   const ws = new WebSocket("wss://mostafa.nageeb-darwish.cloud/app/469630");

  //   const channel_name = `private-user.${user.id}`;
  //   ws.onopen = () => {
  //     console.log("connected");
  //   };

  //   ws.onmessage = async (event) => {
  //     console.log(event.data);

  //     try {
  //       const parsed = JSON.parse(event.data);
  //       if (parsed.event == "pusher:connection_established") {
  //         const data = JSON.parse(parsed.data);
  //         const socket_id = data.socket_id;

  //         const AuthRes = await Axios.post(`/broadcasting/auth`, {
  //           socket_id,
  //           channel_name,
  //         });
  //         const auth = AuthRes.data.auth;

  //         ws.send(
  //           JSON.stringify({
  //             event: "pusher:subscribe",
  //             data: {
  //               channel: channel_name,
  //               auth,
  //             },
  //           }),
  //         );
  //       }
  //       if (parsed.event == "MessageSent") {
  //         console.log(parsed.data);
  //         const message = JSON.parse(parsed.data);
  //         setGetMessages((prev) => [...prev, message.message]);
  //         console.log(message.message);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   ws.onerror = (err) => {
  //     console.log(err);
  //   };
  //   ws.onclose = () => {
  //     console.log("connection closed");
  //   };
  //   return () => {
  //     ws.close();
  //   };
  // }, [user]);

  function handleImage(url) {
    seturlImage(url);
    setshow(true);
  }

  useEffect(() => {
    if (GetMessages?.length < 1) return;

    if (!isPageination.current) {
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    } else {
      const newHeight = chatRef.current.scrollHeight;

      const diff = newHeight - prevHeight.current;

      chatRef.current.scrollTop = diff;
    }
  }, [GetMessages]);

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

    const newMessage = {
      id: Date.now(),
      body: messageText,
      sender: "user",
      created_at: new Date().toISOString(),
      attachments: [],
      read_at: null,
    };

    setGetMessages((prev) => [...prev, newMessage]);

    sendMessage(messageText, id, image);

    setMessageText("");
    setimage([]);
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
    <>
      {show && (
        <>
          <span
            className=" absolute top-15 right-4 text-white z-40 cursor-pointer"
            onClick={() => {
              setshow(false);
            }}
          >
            x
          </span>
          <div className="fixed w-full h-full bg-black opacity-80  z-30"></div>
        </>
      )}
      <div className="p-3">
        {show && (
          <div className="fixed z-50 w-3/4 top-1/2 left-1/2  h-3/4  transform -translate-x-1/2 -translate-y-1/2 ">
            <img
              src={urlImage}
              className="w-full h-full object-contain"
              alt=""
            />
          </div>
        )}
        <div
          className="p-3 mb-4 w-[700px] max-h-[500px] overflow-auto"
          ref={chatRef}
        >
          {GetMessages?.length === 0 && (
            <p className="text-center text-purple-900">لا يوجد رسائل</p>
          )}

          {GetMessages?.map((mes, index) => {
            const showDate = isNewDay(mes, GetMessages[index - 1]);
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
                  {mes.attachments.map((item, i) => {
                    const fileUrl = `https://mostafa.nageeb-darwish.cloud/storage/${item.path}`;

                    return item.path.includes("pdf") ? (
                      <p
                        key={i}
                        className="text-blue-600 cursor-pointer"
                        onClick={() => setPdfUrl(fileUrl)}
                      >
                        📄 Open PDF
                      </p>
                    ) : (
                      <span key={i} onClick={() => handleImage(fileUrl)}>
                        <img src={fileUrl} alt="" />
                      </span>
                    );
                  })}
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
            {image.length > 0
              ? image.map((img) => (
                  <img
                    src={URL.createObjectURL(img)}
                    className="w-10 h-10 me-4"
                    alt=""
                  />
                ))
              : ""}
            <FontAwesomeIcon
              className="cursor-pointer me-4"
              icon={faPaperclip}
              onClick={() => {
                InputRef.current.click();
              }}
            />
            <input
              type="file"
              className="hidden"
              ref={InputRef}
              multiple
              onChange={(e) => {
                setimage([...e.target.files]);
              }}
            />

            <button onClick={handlesendMessage} className="cursor-pointer">
              Send
            </button>

            <img className="w-4 h-4" src={arrow} alt="" />
          </div>
          {pdfUrl && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div
                className="absolute inset-0 bg-black/70"
                onClick={() => setPdfUrl(null)}
              />

              <div className="relative w-[90%] md:w-[70%] h-[90%] bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Close button */}
                <button
                  onClick={() => setPdfUrl(null)}
                  className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded"
                >
                  ✕
                </button>

                <div className="h-full overflow-auto p-2">
                  <Document file={pdfUrl}>
                    <Page pageNumber={1} />
                  </Document>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
///
///
///
///
/////////////////////////////////////
