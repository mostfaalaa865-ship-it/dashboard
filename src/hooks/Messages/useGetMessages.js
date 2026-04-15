import { Axios } from "../../Api/Axios";
import { baseURL, conversations, messages } from "../../Api/Api";
import { useContext, useEffect, useState } from "react";
import { MessageContext } from "../../context/messagesContext";
function useGetMessages(page, id) {
  const [loading, setLoading] = useState(false);

  const { GetMessages, setGetMessages } = useContext(MessageContext);

  useEffect(() => {
    setLoading(true);

    Axios.get(
      `${baseURL}${conversations}/${id}${messages}?page=${page}&per_page=10`,
    )
      .then((res) => {
        const newMessages = res.data.data.reverse();
        setGetMessages((prev) => [...newMessages, ...prev]);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, page]);

  return { GetMessages, setGetMessages, loading };
}

export default useGetMessages;
