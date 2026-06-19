import { useContext } from "react";
import { Companies } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useDeleteCompanies() {
  const { setRefresh } = useContext(ReRender);

  // const time = "b" + Date.now();

  function handleDeleteCompanies(id) {
    Axios.delete(`${Companies}/${id}`)
      .then((res) => {
        setRefresh((prev) => ({
          ...prev,
          company: prev.company + 1,
        }));
      })
      .catch(() => {
        //err
      });
  }

  return { handleDeleteCompanies };
}

export default useDeleteCompanies;
