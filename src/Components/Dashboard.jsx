import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import TopBar from "./TopBar/TopBar";

function Dashboard() {
  return (
    <div className="relative">
      <TopBar />
      <div className="flex  ">
        <SideBar />
        <div className="flex-1 mt-14  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
