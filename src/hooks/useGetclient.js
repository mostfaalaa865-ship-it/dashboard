import React, { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import { Clients } from "../Api/Api";

function useGetclient(id) {
  const [client, setClient] = useState();
  console.log(id);

  useEffect(() => {
    if (!id) return;

    Axios.get(`${Clients}/${id}`)
      .then((res) => {
        setClient(res.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }, [id]);
  return client;
}

export default useGetclient;
