import searchicon from "../assets/headerIcons/Vector.svg";
import Filter from "../assets/headerIcons/Vector-1.svg";
import Sort from "../assets/headerIcons/Vector-2.svg";
import Fields from "../assets/headerIcons/icon.svg";
import Table from "./Table";

function TableNavlinks() {
  return (
    <div>
      <div className="flex justify-between px-4">
        <ul className="flex items-center gap-3">
          <li className="text-[#25272D] font-medium">All · 40</li>
          <li className="text-[#8F929C]">Guests · 45</li>
          <li className="text-[#8F929C]">Partners · 17</li>
          <li className="text-[#8F929C]">Blocked · 3</li>
        </ul>

        <ul className="flex items-center gap-1.5 ">
          <li className="text-[#8F929C] flex items-center p-2 gap-1.5">
            {" "}
            <img src={searchicon} className="w-3 h-3" alt="" />
            Search
          </li>
          <li className="text-[#8F929C] flex items-center p-2 gap-1.5">
            {" "}
            <img src={Filter} className="w-3 h-3" alt="" />
            Filter
          </li>
          <li className="text-[#8F929C] flex items-center p-2 gap-1.5">
            {" "}
            <img src={Sort} className="w-3 h-3" alt="" />
            Sort
          </li>
          <li className="text-[#8F929C] flex items-center p-2 gap-1.5">
            {" "}
            <img src={Fields} className="w-3 h-3" alt="" />
            Fields
          </li>
        </ul>
      </div>
      <div className=" w-full bg-[#E2E4E9] h-[1px] m-1"></div>
    </div>
  );
}

export default TableNavlinks;
