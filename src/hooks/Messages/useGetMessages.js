import { Axios } from "../../Api/Axios";
import { baseURL, conversations, messages } from "../../Api/Api";
import { useEffect, useState } from "react";
function useGetMessages(id, page) {
  const [getMessages, setGetMessages] = useState([]);

  useEffect(() => {
    Axios.get(
      `${baseURL}${conversations}/${id}${messages}?page=${page}&per_page=10`,
    )
      .then((res) => {
        const newMessages = res.data.data.reverse();
        setGetMessages((prev) => [...newMessages, ...prev]);
        console.log(newMessages);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, page]);

  return { getMessages, setGetMessages };
}

export default useGetMessages;
