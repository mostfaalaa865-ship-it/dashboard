import { useContext } from "react";
import { Clients } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useDeleteClient() {
  const time = "a" + Date.now();

  const { setisRender } = useContext(ReRender);

  function handleDelete(id) {
    Axios.delete(`${Clients}/${id}`)
      .then((res) => {
        setisRender(time);
      })
      .catch(() => {
        // log
      });
  }

  return { handleDelete };
}

export default useDeleteClient;
