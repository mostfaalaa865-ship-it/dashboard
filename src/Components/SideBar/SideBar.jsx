import { NavLink } from "react-router-dom";
import Vector from "../../assets/Icons/Vector.svg";
import logo from "../../assets/Icons/logo.svg";
import { links, linkstwo } from "../NavLinks";
import { Applinks } from "../NavLinks";
import menu from "../../assets/Icons/menu.svg";

function SideBar() {
  return (
    <div className="sidebar  sticky  w-52.5 p-2 z-50 flex flex-col h-full top-0  bg-[#F3F4F6]">
      <div className="sidebar-title flex items-center gap-1 w-45 h-9 mb-4">
        <div className="name w-38 p-2 flex items-center gap-2 cursor-pointer hover:bg-[#E2E4E9] rounded-md">
          <img src={logo} className="w-5 h-5" alt="" />
          <p>Defcon CRM</p>
          <img src={Vector} className="w-2 h-1.75" alt="" />
        </div>

        <img
          src={menu}
          className="w-4 h-4 cursor-pointer hover:bg-[#E2E4E9]"
          alt=""
        />
      </div>

      <div className="flex-1 flex flex-col justify-between ">
        <div className="h-180.5">
          {links.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className="flex items-center my-2 gap-1 rounded-md p-0.5  active:bg-white hover:bg-[#ECEDF0]"
            >
              <img src={item.icon} className="w-3.5 h-3.5 mx-1.5" />
              <p>{item.name}</p>
            </NavLink>
          ))}

          <div className="mt-4 w-45">
            <p className="text-[#8F929C]">Apps</p>
            {Applinks.map((item) => (
              <NavLink
                to={item.path}
                key={item.name}
                className="flex items-center my-2 gap-1 rounded-md p-0.5  active:bg-white hover:bg-[#ECEDF0]"
              >
                <img src={item.icon} className="w- h-3.5 mx-1.5" />
                <p>{item.name}</p>
              </NavLink>
            ))}
          </div>
        </div>

        <div className=" w-45 h-23.75 mt-16 ">
          {linkstwo.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              className="flex items-center my-2 gap-1 rounded-md p-0.5  active:bg-white hover:bg-[#ECEDF0]"
            >
              <img src={item.icon} className="w-3.5 h-3.5 mx-1.5" />
              <p>{item.name}</p>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SideBar;
