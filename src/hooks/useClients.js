import { useContext, useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { baseURL, Clients } from "../Api/Api";
import { ReRender } from "../context/ReRender";

function useClients() {
  const render = useContext(ReRender);
  const [clients, setClients] = useState([]);
  function getData() {
    Axios.get(`${baseURL}${Clients}?page=1&per_page=15&search=`)
      .then((res) => {
        setClients(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (render.isRender.includes("a")) {
      getData();
    }
  }, [render.isRender]);
  return { clients };
}

export default useClients;
