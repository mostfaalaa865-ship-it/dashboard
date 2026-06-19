import { useContext } from "react";
import { Clients } from "../../Api/Api";
import { Axios } from "../../Api/Axios";
import { ReRender } from "../../context/ReRender";

function useDeleteClient() {
  // const time = "a" + Date.now();

  const { setRefresh } = useContext(ReRender);

  function handleDelete(id) {
    Axios.delete(`${Clients}/${id}`)
      .then((res) => {
        // setisRender(time);
        setRefresh((prev) => ({
          ...prev,
          clients: prev.clients + 1,
        }));
      })
      .catch(() => {
        //err
      });
  }

  return { handleDelete };
}

export default useDeleteClient;
