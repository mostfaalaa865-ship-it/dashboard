import { Axios } from "../../Api/Axios";
import { baseURL, conversations, messages } from "../../Api/Api";
import { useEffect, useState } from "react";
function useGetMessages(id) {
  const [getMessages, setGetMessages] = useState([]);

  useEffect(() => {
    Axios.get(`${baseURL}${conversations}/${id}${messages}`)
      .then((res) => {
        console.log(res);
        setGetMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return { getMessages, setGetMessages };
}

export default useGetMessages;
