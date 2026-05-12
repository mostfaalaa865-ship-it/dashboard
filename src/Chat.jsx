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
      attachments: image,
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
  console.log(GetMessages);

  return (
    <>
      {show && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
              className="absolute inset-0 bg-black/70"
              onClick={() => setshow(false)}
            />

            <div className="relative w-[90%] md:w-[70%] h-[90%]   overflow-hidden">
              <button
                onClick={() => setshow(false)}
                className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded cursor-pointer"
              >
                ✕
              </button>

              <img
                src={urlImage}
                className="w-full h-full object-contain z-52"
                alt=""
              />
            </div>
          </div>
        </>
      )}
      <div className="p-3">
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

                    return item.mime_type === "application/pdf" ||
                      item.type === "application/pdf" ? (
                      <p
                        key={i}
                        className="text-blue-600 cursor-pointer"
                        onClick={() =>
                          setPdfUrl(
                            item.path ? fileUrl : URL.createObjectURL(item),
                          )
                        }
                      >
                        📄 Open PDF
                      </p>
                    ) : (
                      <span
                        key={i}
                        onClick={() =>
                          handleImage(
                            item.path ? fileUrl : URL.createObjectURL(item),
                          )
                        }
                      >
                        <img
                          src={item.path ? fileUrl : URL.createObjectURL(item)}
                          alt=""
                        />
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

          <div
            className={`fixed inset-0  flex items-center justify-center ${pdfUrl ? "z-50 " : " invisible z-0"} `}
          >
            <div
              className={`absolute inset-0 bg-black/70 transition-all   ${pdfUrl ? "  block " : " invisible z-0"}`}
            ></div>
            <div onClick={() => setPdfUrl(null)} />

            <div
              className={`relative w-[90%] md:w-[70%] h-[90%] bg-white rounded-xl  shadow-xl overflow-hidden transition-all ${pdfUrl ? " scale-100 block " : "scale-50  invisible z-0"}`}
            >
              {/* Close button */}
              <button
                onClick={() => setPdfUrl(null)}
                className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded  "
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
