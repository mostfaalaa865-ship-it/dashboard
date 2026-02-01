import { Axios } from "../Api/Axios";
import { LogoutURL } from "../Api/Api";
import Cookies from "universal-cookie";

function Logout() {
  const cookies = new Cookies();

  function handleLogout() {
    Axios.post(`${LogoutURL}`)
      .then((res) => {
        console.log(res);
        cookies.remove("token");

        window.location.href = "/login";
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return (
    <div>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}

export default Logout;
