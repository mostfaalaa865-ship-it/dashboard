import { Axios } from "../../Api/Axios";
import { useContext, useEffect, useState } from "react";
import { ReRender } from "../../context/ReRender";
import { Companies } from "../../Api/Api";

function useClients() {
  const [page, setpage] = useState(1);

  const render = useContext(ReRender);

  const [companies, setcompanies] = useState([]);

  function getCompanies() {
    Axios.get(`${Companies}?page=${page}&per_page=5&search=`)
      .then((res) => {
        setcompanies(res.data);
      })
      .catch((err) => {
        //err
      });
  }
  useEffect(() => {
    getCompanies();
  }, [page]);

  useEffect(() => {
    if (render.isRender.includes("b")) {
      getCompanies();
    }
  }, [render.isRender, page]);
  return { companies, page, setpage };
}

export default useClients;
