import { Axios } from "../../Api/Axios";
import { baseURL, conversations, messages } from "../../Api/Api";
import { useContext, useEffect, useRef, useState } from "react";
import { MessageContext } from "../../context/messagesContext";
function useGetMessages(page, id) {
  const [loading, setLoading] = useState(false);
  const [oldpage, setOldpage] = useState([]);
  const { GetMessages, setGetMessages } = useContext(MessageContext);
  const prevPageRef = useRef(page);

  useEffect(() => {
    prevPageRef.current = page;
  }, [page]);

  useEffect(() => {
    setLoading(true);

    Axios.get(
      `${baseURL}${conversations}/${id}${messages}?page=${page}&per_page=10`,
    )
      .then((res) => {
        const newMessages = res.data.data.reverse();
        if (page > 1) {
          setGetMessages((prev) => [...newMessages, ...prev]);
        } else {
          setGetMessages([...newMessages]);
        }
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
