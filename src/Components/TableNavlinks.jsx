import searchicon from "../assets/headerIcons/Vector.svg";
import Filter from "../assets/headerIcons/Vector-1.svg";
import Sort from "../assets/headerIcons/Vector-2.svg";
import Fields from "../assets/headerIcons/icon.svg";
import Table from "./Table";
import ModalFilter from "./modals/ModalFilter";

function TableNavlinks(props) {
  return (
    <div>
      <div className="flex justify-between px-4 h-9">
        <ul className="flex items-center gap-3 ">
          <li className="text-[#25272D] font-medium h-9  hover:border-b-2  transition-colors  duration-700  hover:border-b-[#74798B]">
            {props.name}
          </li>
          <li className="text-[#8F929C] h-9  hover:border-b-2  transition-all duration-700  hover:border-b-[#74798B]">
            {props.name2}
          </li>
          <li className="text-[#8F929C] h-9  hover:border-b-2  transition   duration-700 hover:border-b-[#74798B]">
            {props.name3}
          </li>
          <li className="text-[#8F929C] h-9  hover:border-b-2  transition   duration-700  hover:border-b-[#74798B]">
            {props.name4}
          </li>
        </ul>

        <ul className="flex items-center gap-1.5 ">
          <li className="text-[#8F929C] flex items-center p-2 gap-1.5">
            {" "}
            <img src={searchicon} className="w-3 h-3" alt="" />
            <input
              value={props.searchValue}
              onChange={(e) => {
                props.setsearchValue(e.target.value);
              }}
              placeholder="Search"
              className="w-[50px] outline-none placeholder-[#8F929C]"
            />
          </li>
          <li
            className="text-[#8F929C] flex items-center p-2 gap-1.5 cursor-pointer"
            onClick={() => {
              props.setOpen((prev) => !prev);
            }}
          >
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
      <div className=" w-full bg-[#E2E4E9] h-px mb-1"></div>
      <ModalFilter
        open={props.open}
        setOpen={props.setOpen}
        filterOptions={props.filterOptions}
      />
    </div>
  );
}

export default TableNavlinks;

////////////
////////////////
