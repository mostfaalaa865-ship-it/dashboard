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
    <div className="">
      <button
        onClick={handleLogout}
        className=" 
                cursor-pointer
                  rounded-sm
                  bg-[#6696F5]
                  hover:bg-[#6287E6]
                  text-black
                  p-1
                  rounded-b-sm
                  "
      >
        logout
      </button>
    </div>
  );
}

export default Logout;
