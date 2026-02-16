import React, { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { Companies } from "../Api/Api";

function useGetcompany(id) {
  const [company, setcompany] = useState();
  console.log(id);

  useEffect(() => {
    if (!id) return;

    Axios.get(`${Companies}/${id}`)
      .then((res) => {
        setcompany(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [id]);
  return company;
}

export default useGetcompany;
