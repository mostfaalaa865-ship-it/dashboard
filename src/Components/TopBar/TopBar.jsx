import VectorIcon from "./Vector.svg";
import VectorIcon2 from "./Vector2.svg";
import Logout from "../../Auth/Logout";
import { useContext, useState } from "react";
import { User } from "../../context/GetUser";
import Modal from "../../Modal";
import { useLocation } from "react-router-dom";
import ModalCompanies from "../../ModalCompanies";
import ModalClient from "../../Modal";

function TopBar() {
  const [showModal, setShowModal] = useState(false);
  const userContext = useContext(User);

  const location = useLocation();
  const path = location.pathname;

  let title = "Dashboard";

  if (path.includes("Clients")) {
    title = "Clients";
  } else if (path.includes("Companies")) {
    title = "Companies";
  }

  return (
    <div>
      <div
        className="
        fixed top-0 right-0
        h-14
        bg-white
        flex items-center justify-between
        px-4
        z-40
        w-full
        lg:left-[210px]
        lg:w-[calc(100%-210px)]
      "
      >
        <div className="flex items-center gap-3">
          <h1 className="text-[16px] font-medium">{title}</h1>
          <img className="w-[13px] h-[6px]" src={VectorIcon} alt="" />
        </div>

        <div className="flex gap-3 text-[13px]">
          <button
            className="h-7 px-3 rounded-sm border border-[#E2E4E9]
          cursor-pointer transition hover:bg-[#F3F4F6]
          flex items-center gap-2
        "
          >
            Import / Export
            <img src={VectorIcon2} alt="" className="w-[9px] h-[6px]" />
          </button>

          <button
            className="
            h-7
            px-4
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
            Create {title}
          </button>
        </div>
        <div className="flex gap-4 ">
          <Logout />

          <div className="border-3 border-amber-300 px-2 py-1 font-semibold rounded-3xl text-white bg-black/80">
            {userContext?.user?.name}
          </div>
        </div>
      </div>
      {/* <Modal showModal={showModal} setShowModal={setShowModal}></Modal> */}
      {title == "Clients" ? (
        <ModalClient showModal={showModal} setShowModal={setShowModal} />
      ) : (
        <ModalCompanies showModal={showModal} setShowModal={setShowModal} />
      )}
    </div>
  );
}

export default TopBar;
