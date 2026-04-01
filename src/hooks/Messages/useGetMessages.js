import { Axios } from "../../Api/Axios";
import { baseURL, conversations, messages } from "../../Api/Api";
import { useEffect, useState } from "react";
function useGetMessages(page, id) {
  const [getMessages, setGetMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

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
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, page]);

  return { getMessages, setGetMessages, loading };
}

export default useGetMessages;
