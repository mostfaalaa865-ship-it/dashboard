import VectorIcon from "./Vector.svg";
import VectorIcon2 from "./Vector2.svg";
import Logout from "../../Auth/Logout";
function TopBar() {
  return (
    <div
      className="
        fixed top-0 right-0
        h-[56px]
        bg-white
        flex items-center justify-between
        px-4
        z-40

        w-full
        lg:left-[210px]
        lg:w-[calc(100%-210px)]
      "
    >
      <Logout />

      <div className="flex items-center gap-3">
        <h1 className="text-[16px] font-medium">Clients</h1>
        <img className="w-[13px] h-[6px]" src={VectorIcon} alt="" />
      </div>

      <div className="flex gap-3 text-[13px]">
        <button
          className="h-[28px] px-3 rounded-sm border border-[#E2E4E9]
          cursor-pointer transition hover:bg-[#F3F4F6]
          flex items-center gap-2
        "
        >
          Import / Export
          <img src={VectorIcon2} alt="" className="w-[9px] h-[6px]" />
        </button>

        <button
          className="
            h-[28px]
            px-4
            cursor-pointer
            text-white
            rounded-sm
            bg-[#6696F5]
            hover:bg-[#6287E6]
            transition
            whitespace-nowrap
          "
        >
          Create Client
        </button>
      </div>
    </div>
  );
}

export default TopBar;
