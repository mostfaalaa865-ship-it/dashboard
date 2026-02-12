import { Clients } from "../Api/Api";
import { Axios } from "../Api/Axios";

function useDeleteClient() {
  function handleDelete(id) {
    Axios.delete(`${Clients}/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((res) => {
        console.log(res);
      });
  }

  return { handleDelete };
}

export default useDeleteClient;
