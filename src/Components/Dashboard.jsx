import { Outlet } from "react-router-dom";
import SideBar from "./sidebar/SideBar";
import TopBar from "./TopBar/TopBar";

function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="flex  ">
        <hr />
        <SideBar />
        <div className="flex-1 mt-14  ">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
