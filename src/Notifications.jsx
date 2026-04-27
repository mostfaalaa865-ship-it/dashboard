import { Axios } from "./Api/Axios";
import { useContext, useEffect, useRef } from "react";
import { NotificationsContext } from "./context/numNotifications";
import useReadAll from "./hooks/notifications/useReadAll";
import useRead from "./hooks/notifications/useRead";
import { useNavigate } from "react-router-dom";

function Notifications({ setshow }) {
  const navigate = useNavigate();
  const { notifications2, setPage, loading } = useContext(NotificationsContext);
  const { handleReadAll } = useReadAll();
  const { handleRead } = useRead();
  const containerRef = useRef();
  console.log(notifications2);

  function timeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();

    const seconds = Math.floor((now - date) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
    };

    if (seconds < 60) return "just now";

    for (let key in intervals) {
      const interval = Math.floor(seconds / intervals[key]);

      if (interval >= 1) {
        return interval === 1 ? `1 ${key} ago` : `${interval} ${key}s ago`;
      }
    }
  }

  useEffect(() => {
    const el = containerRef.current;

    function handleScroll() {
      if (!el) return;

      const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 100;

      if (isBottom && !loading) {
        setPage((prev) => prev + 1);
      }
    }

    el.addEventListener("scroll", handleScroll);

    return () => el.removeEventListener("scroll", handleScroll);
  }, [loading]);

  return (
    <div>
      <div className="bg-white right-0 top-[15px]  h-[620px]  w-[466px] rounded-3xl shadow-2xl absolute border  border-[#E2E4E9] ">
        <div className=" border-b border-[#ECEDF0] h-12 flex items-center justify-between p-3   ">
          <h3 className="text-[#25272D] text-lg font-medium"> Notifications</h3>
          <p className="text-[#8F929C] cursor-pointer" onClick={handleReadAll}>
            Mark all as read
          </p>
        </div>
        <div className="overflow-auto h-[550px]" ref={containerRef}>
          {notifications2?.map((item) => (
            <div
              onClick={() => {
                navigate(`/dashboard/chat/${item.data.conversation_id}`);
                handleRead(item.id);

                setshow(false);
                console.log(item);
              }}
              key={item.id}
              className="p-3 ms-1 flex  justify-between  cursor-pointer h-20 border-b border-[#ECEDF0] "
            >
              <div>
                <p className="text-sm">{item.data.body}</p>
                <span className="text-[#8F929C] text-[14px]">
                  {`${timeAgo(item.created_at)}-Defcon systems`}
                </span>
              </div>
              {!item.read_at && (
                <span className="h-2 w-2 bg-[#6696F5] rounded-full"></span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Notifications;
//
