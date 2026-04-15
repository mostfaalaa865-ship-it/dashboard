import VectorIcon from "./Vector.svg";
import VectorIcon2 from "./Vector2.svg";
import Logout from "../../Auth/Logout";
import { useContext, useState } from "react";
import { User } from "../../context/GetUser";
import { useLocation } from "react-router-dom";
import ModalCompanies from "../modals/ModalCompanies";
import ModalClient from "../modals/ModalClient";
import ModalProduct from "../modals/ModalProduct";
import ModalMessages from "../modals/ModalMessages";
import Notificationsicon from "../../assets/Icons/Vector-3.svg";
import Notifications from "../../Notifications";
import { NotificationsContext } from "../../context/numNotifications";

function TopBar() {
  const [showModal, setShowModal] = useState(false);
  const userContext = useContext(User);
  const [show, setshow] = useState(false);
  const location = useLocation();
  const path = location.pathname;
  const { notifications2 } = useContext(NotificationsContext);
  const numNotifications = notifications2.filter(
    (n) => n.read_at === null,
  ).length;

  let title = "";

  if (path.includes("Clients")) {
    title = "Clients";
  } else if (path.includes("Companies")) {
    title = "Companies";
  } else if (path.includes("Products")) {
    title = "Products";
  } else if (path.includes("Messages")) {
    title = "Messages";
  } else if (path.includes("xx")) {
    title = "Re: New invoice regulation (E-Rechnung)";
  }

  return (
    <div>
      <div
        className="
        fixed top-0 right-0
        bg-white
        flex flex-wrap items-center justify-between
        gap-3
        px-4 py-2
        z-40
        w-full
        lg:left-[210px]
        lg:w-[calc(100%-210px)]
      "
      >
        {/* title */}
        <div className="flex items-center gap-2 min-w-0">
          <h1 className="text-[14px] sm:text-[16px] font-medium truncate">
            {title}
          </h1>

          <img className="w-[13px] h-[6px]" src={VectorIcon} alt="" />
        </div>

        {/* buttons */}
        <div className="flex flex-wrap items-center gap-2 text-[12px] sm:text-[13px]">
          <button
            className="
            h-7 px-3 rounded-sm border border-[#E2E4E9]
            cursor-pointer transition hover:bg-[#F3F4F6]
            flex items-center gap-2
          "
          >
            Import / Export
            <img src={VectorIcon2} alt="" className="w-[9px] h-[6px]" />
          </button>

          <button
            className="
            h-7 px-3 sm:px-4
            cursor-pointer
            text-white
            rounded-sm
            bg-[#6696F5]
            hover:bg-[#6287E6]
            transition
            whitespace-nowrap
          "
            onClick={() => setShowModal(true)}
          >
            {title === "Messages" ? "New Chat" : `Create ${title}`}
          </button>
        </div>

        {/* user */}
        <div className="flex items-center gap-3">
          <div className=" relative">
            {" "}
            <img
              src={Notificationsicon}
              alt=""
              className=" cursor-pointer w-[18px] "
              onClick={() => setshow((prev) => !prev)}
            />
            <div className="absolute -top-2 -right-1 w-4 h-4 flex items-center justify-center rounded-full bg-[#6696F5] text-white text-[10px]">
              {numNotifications}
            </div>
            {show && <Notifications setshow={setshow} />}
          </div>
          <Logout />

          <div
            className="
            hidden sm:block
            border-2 border-amber-300
            px-2 py-1
            font-semibold
            rounded-3xl
            text-white
            bg-black/80
            text-[12px]
          "
          >
            {userContext?.user?.name}
          </div>
        </div>
      </div>

      {title == "Clients" ? (
        <ModalClient showModal={showModal} setShowModal={setShowModal} />
      ) : title == "Companies" ? (
        <ModalCompanies showModal={showModal} setShowModal={setShowModal} />
      ) : title == "Messages" ? (
        <ModalMessages showModal={showModal} setShowModal={setShowModal} />
      ) : (
        <ModalProduct showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default TopBar;
/////
