import useLogout from "../hooks/useLogout";
function Logout() {
  const handleLogout = useLogout();

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
