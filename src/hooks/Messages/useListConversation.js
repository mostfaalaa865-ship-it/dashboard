import { useState, useEffect } from "react";
import { Axios } from "../../Api/Axios";
import { baseURL, conversations } from "../../Api/Api";

function useListConversation() {
  const [conversation, setconversation] = useState([]);
  useEffect(() => {
    Axios.get(`${baseURL}${conversations}`)
      .then((res) => {
        setconversation(res.data);
      })
      .catch((err) => {
        console.log(err);
        setError(err);
      });
  }, []);

  return { conversation };
}

export default useListConversation;
