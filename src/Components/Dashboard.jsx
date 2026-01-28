import { Outlet } from "react-router-dom"
import SideBar from "./sidebar/SideBar"
import TopBar from "./TopBar/TopBar"

function Dashboard() {
  return (
    <div>
      <TopBar/>
      <SideBar/>
      <Outlet/>
    </div>
  )
}

export default Dashboard
