import { useContext } from "react";
import { Companies } from "../Api/Api";
import { Axios } from "../Api/Axios";
import { ReRender } from "../context/ReRender";

function useDeleteCompanies() {
  const { setisRender } = useContext(ReRender);

  const time = "b" + Date.now();

  function handleDeleteCompanies(id) {
    Axios.delete(`${Companies}/${id}`)
      .then((res) => {
        console.log(res);
        setisRender(time);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return { handleDeleteCompanies };
}

export default useDeleteCompanies;
