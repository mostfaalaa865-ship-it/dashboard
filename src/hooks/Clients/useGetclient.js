import { useEffect, useState } from "react";
import { Axios } from "../../Api/Axios";
import { Clients } from "../../Api/Api";

function useGetclient(id) {
  const [client, setClient] = useState();

  useEffect(() => {
    if (!id) return;

    Axios.get(`${Clients}/${id}`)
      .then((res) => {
        setClient(res.data);
      })
      .catch(() => {
        // log err
      });
  }, [id]);
  return client;
}

export default useGetclient;
