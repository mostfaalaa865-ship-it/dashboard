import { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { baseURL, Clients } from "../Api/Api";

function useClients() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    Axios.get(`${baseURL}${Clients}?page=1&per_page=15&search=`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, []);
  return { clients };
}

export default useClients;
