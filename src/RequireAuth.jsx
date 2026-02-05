import Cookies from "universal-cookie";
import { Navigate, Outlet } from "react-router-dom";
import Loading from "./Loading/Loading";
import useUser from "./hooks/useUser";

function RequireAuth() {
  const user = useUser();
  const cookies = new Cookies();
  const token = cookies.get("token");

  return token ? (
    user.user.name === "" ? (
      <Loading />
    ) : (
      <Outlet />
    )
  ) : (
    <Navigate to="/login" replace />
  );
}

export default RequireAuth;
