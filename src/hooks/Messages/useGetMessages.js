import { Axios } from "../../Api/Axios";
import { baseURL, conversations, messages } from "../../Api/Api";
import { useEffect, useState } from "react";
function useGetMessages(page, id) {
  const [getMessages, setGetMessages] = useState([]);

  useEffect(() => {
    Axios.get(
      `${baseURL}${conversations}/${id}${messages}?page=${page}&per_page=10`,
    )
      .then((res) => {
        console.log(res);

        const NewData = res.data.data.reverse();
        setGetMessages((prev) => {
          const newMessages = NewData.filter(
            (newMsg) => !prev.some((oldMsg) => oldMsg.id === newMsg.id),
          );

          return [...newMessages, ...prev];
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, page]);

  return { getMessages, setGetMessages };
}

export default useGetMessages;
